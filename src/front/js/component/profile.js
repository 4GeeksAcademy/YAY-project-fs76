import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import GetUserImages from "./getUserImagens";
import GetUserPerfilImage from "./getUserPerfilImage";
import UserInterest from "./userInterest";
import "../../styles/profile.css"; // Archivo de CSS personalizado

const Profile = () => {
    const { store, actions } = useContext(Context);
    const { userId } = useParams();
    const [profile, setProfile] = useState({
        selectedInterests: [],
    });

    const handleInterestSelect = (selectedInterests) => {
        setProfile((prevProfile) => ({ ...prevProfile, selectedInterests }));
        localStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));
    };

    useEffect(() => {
        const idToUse = userId || localStorage.getItem("userId") || store.user_id;

        if (idToUse) {
            actions.getProfile(idToUse)
                .then((data) => {
                    if (data) {
                        setProfile(data);
                        const storedInterests = localStorage.getItem('selectedInterests');
                        if (storedInterests) {
                            setProfile((prevProfile) => ({ ...prevProfile, selectedInterests: JSON.parse(storedInterests) }));
                        }
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

    return (
        <div className="container mt-5">
            <div className="profile-card">
                <div className="profile-card-header">
                    {/* Imagen de perfil en la parte superior */}
                    <GetUserPerfilImage />
                </div>
                
                <div className="profile-card-body">
                    {/* Datos del perfil a la izquierda */}
                    <div className="profile-details">
                        <h3>Perfil del Usuario</h3>
                        {profile.nombre ? (
                            <>
                                <p><strong>Nombre:</strong> {profile.nombre}</p>
                                <p><strong>Apellidos:</strong> {profile.apellidos}</p>
                                <p><strong>Fecha de Nacimiento:</strong> {profile.fecha_nacimiento}</p>
                                <p><strong>Dirección:</strong> {profile.direccion}</p>
                                <p><strong>Descripción:</strong> {profile.breve_descripcion}</p>
                                {profile.selectedInterests && (
                                    <p><strong>Intereses:</strong> {profile.selectedInterests.join(', ')}</p>
                                )}
                                <div className="mt-3">
                                    <Link to={`/editProfile/${userId}`}>
                                        <button className="btn btn-custom-primary">Editar Perfil</button>
                                    </Link>
                                    <Link to={`/inscripciones/${userId}`}>
                                        <button className="btn btn-custom-secondary">Tus Eventos</button>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <p>Cargando perfil...</p>
                        )}
                    </div>

                    {/* Imágenes de usuario a la derecha */}
                    <div className="profile-images">
                        <GetUserImages userId={userId || localStorage.getItem("userId") || store.user_id} />
                    </div>
                </div>

                {/* Intereses adicionales del usuario debajo */}
                <div className="profile-card-footer">
                    <UserInterest />
                </div>
            </div>
        </div>
    );
};

export default Profile;
