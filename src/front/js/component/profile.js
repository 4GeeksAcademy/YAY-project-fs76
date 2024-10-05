import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom"; // Importa Link para la navegación
import ImageUpload from "./imageUpload";
import GetUserImages from "./getUserImagens";

const Profile = () => {
    const { store, actions } = useContext(Context);
    const { userId } = useParams();
    const [profile, setProfile] = useState({});

    useEffect(() => {
        // Verifica si el userId está en los parámetros, si no, obténlo de localStorage
        const idToUse = userId || localStorage.getItem("userId") || store.user_id;

        if (idToUse) {
            actions.getProfile(idToUse)
                .then((data) => {
                    if (data) {
                        setProfile(data);
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
    }, [userId, store.user_id]);

    // Renderiza el perfil
    return (
        <div>
            <h2>Perfil del usuario</h2>
            {profile.nombre ? (
                <> 
                    <div className="d-flex flex-row">
                        <div>
                            <p>Nombre: {profile.nombre}</p>
                            <p>Apellidos: {profile.apellidos}</p>
                            <p>Fecha de nacimiento: {profile.fecha_nacimiento}</p>
                            <p>Ubicación: {profile.ubicacion}</p>
                            <p>Breve descripción: {profile.breve_descripcion}</p>
                            <Link to={`/editProfile/${userId}`}>
                                <button>Editar perfil</button>
                            </Link>
                        </div>
                        <div>
                            {/* Pasa el userId como prop */}
                            <GetUserImages userId={userId || localStorage.getItem("userId") || store.user_id} />
                        </div>
                    </div>
                </>
            ) : (
                <p>Cargando perfil...</p>
            )}
        </div>
    );
};

export default Profile;
