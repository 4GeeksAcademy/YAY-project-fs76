import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import GetUserImages from "./getUserImagens";
import GetUserPerfilImage from "./getUserPerfilImage";
import UserInterest from "./userInterest";
import "../../styles/perfilUsuario.css";

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
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <h2 className="text-center mb-4">Perfil del Usuario</h2>
                    {profile.nombre ? (
                        <>
                            <div className="row">
                                {/* Información del perfil */}
                                <div className="col-md-6">
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
                                            <button className="btn btn-custom-primary btn-lg me-2">Editar Perfil</button>
                                        </Link>
                                        <Link to={`/inscripciones/${userId}`}>
                                            <button className="btn btn-custom-secondary btn-lg">Tus Eventos</button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Imagen de perfil y galería */}
                                <div className="col-md-6 text-center">
                                    <GetUserPerfilImage />
                                    <GetUserImages userId={userId || localStorage.getItem("userId") || store.user_id} />
                                </div>
                            </div>

                            {/* Intereses adicionales del usuario */}
                            <UserInterest />
                        </>
                    ) : (
                        <p className="text-center">Cargando perfil...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
