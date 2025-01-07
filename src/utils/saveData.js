import { ref, push, set } from "firebase/database";
import { database } from "../lib/firebaseConfig";

export const saveDataToFirebase = (values, anonymous, getDate) => {
    if (anonymous) {
        values['author'] = 'Anónimx';
    }

    values['date'] = getDate();

    const postsRef = ref(database);

    const newPostRef = push(postsRef);
    return set(newPostRef, values)
        .then(() => {
            console.log("Datos guardados con éxito");
            return true;
        })
        .catch((error) => {
            console.error("Error al guardar los datos:", error);
            return false;
        });
};
