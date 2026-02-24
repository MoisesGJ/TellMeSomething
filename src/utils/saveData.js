import { ref, push, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; // Importar getDownloadURL
import { database } from "../lib/firebaseConfig";

export const saveDataToFirebase = async (values, anonymous, getDate, file) => {
    if (anonymous) {
        values['author'] = 'Anónimx';
    }

    values['date'] = getDate();

    try {
        // Subir la imagen si se ha seleccionado un archivo
        let imageURL = null;
        if (file) {
            if (!file.type.startsWith("image/")) {
                console.error("El archivo seleccionado no es una imagen válida");
                return false;
            }

            // Obtener la instancia de Firebase Storage
            const storage = getStorage();

            // Crear una referencia en Firebase Storage con un nombre único
            const imageRef = storageRef(storage, `images/${Date.now()}-${file.name}`);

            // Subir el archivo a Firebase Storage
            const snapshot = await uploadBytes(imageRef, file);

            // Obtener la URL de descarga de la imagen
            imageURL = await getDownloadURL(snapshot.ref); // Usar getDownloadURL aquí
            console.log('Imagen subida exitosamente:', imageURL);
        }

        // Agregar la URL de la imagen a los datos (si se subió una imagen)
        if (imageURL) {
            values['imageURL'] = imageURL;
        }

        // Guardar los valores en Firebase Realtime Database
        const postsRef = ref(database);
        const newPostRef = push(postsRef);

        await set(newPostRef, values);

        console.log("Datos guardados con éxito");
        return { success: true, imageURL, postId: newPostRef.key }; // Devolver más información si es necesario
    } catch (error) {
        console.error("Error al guardar los datos:", error);
        return false;
    }
};
