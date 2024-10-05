import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext"; // Asegúrate de que la ruta sea correcta
import { useParams } from "react-router-dom";

const Profile = () => {
    const { store, actions } = useContext(Context); // Accede al contexto
    const { userId } = useParams(); // Obtén userId de los parámetros de la URL
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const idToUse = userId || store.user_id; // Usa userId de params o del estado

        if (idToUse) {
            actions.getProfile(idToUse) // Llama a la acción getProfile
                .then((data) => {
                    if (data) {
                        setProfile(data); // Establece el perfil en el estado local
                    } else {
                        console.error("No se pudo obtener el perfil");
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener el perfil:", error);
                });
        } else {
            console.error("No se proporcionó userId");
        }
    }, [userId, store.user_id]); // Asegúrate de tener las dependencias correctas

    // Renderiza el perfil
    return (
        <div>
            <h2>Perfil del usuario</h2>
            {profile.nombre ? (
                <>
                    <p>Nombre: {profile.nombre}</p>
                    <p>Apellidos: {profile.apellidos}</p>
                    <p>Fecha de nacimiento: {profile.fecha_nacimiento}</p>
                    <p>Ubicación: {profile.ubicacion}</p>
                    <p>Breve descripción: {profile.breve_descripcion}</p>
                </>
            ) : (
                <p>Cargando perfil...</p>
            )}
        </div>
    );
};

export default Profile;
