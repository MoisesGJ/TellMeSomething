import { ref, push, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { database, authReady } from "../lib/firebaseConfig";

export const saveDataToFirebase = async (values, anonymous, getDate, file) => {
    if (anonymous) {
        values['author'] = 'Anónimx';
    }

    values['date'] = getDate();

    try {
        // Esperar a que el usuario esté autenticado (anónimo o con email)
        // antes de intentar cualquier escritura en la base de datos.
        await authReady;

        let imageURL = null;
        if (file) {
            if (!file.type.startsWith("image/")) {
                console.error("El archivo seleccionado no es una imagen válida");
                return { success: false, error: 'invalid_type' };
            }

            const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
            if (file.size > MAX_FILE_SIZE_BYTES) {
                console.error("El archivo supera el tamaño máximo de 5 MB");
                return { success: false, error: 'file_too_large' };
            }

            const storage = getStorage();
            const imageRef = storageRef(storage, `images/${Date.now()}-${file.name}`);
            const snapshot = await uploadBytes(imageRef, file);
            imageURL = await getDownloadURL(snapshot.ref);
        }

        if (imageURL) {
            values['imageURL'] = imageURL;
        }

        const postsRef = ref(database);
        const newPostRef = push(postsRef);
        await set(newPostRef, values);

        return { success: true, imageURL, postId: newPostRef.key };
    } catch (error) {
        console.error("Error al guardar los datos:", error);
        return false;
    }
};
