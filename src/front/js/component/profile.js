import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import GetUserImages from "./getUserImagens";
import GetUserPerfilImage from "./getUserPerfilImage";
import UserInterest from "./userInterest";

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
        <div className="m-5">
            <h2>Perfil del usuario</h2>
            {profile.nombre ? (
                <> 
                    <div className="d-flex flex-row my-5 justify-content-around">
                        <div>

                            <p>Nombre: {profile.nombre}</p>
                            <p>Apellidos: {profile.apellidos}</p>
                            <p>Fecha de nacimiento: {profile.fecha_nacimiento}</p>
                            <p>Dirección: {profile.direccion}</p>
                            <p>Breve descripción: {profile.breve_descripcion}</p>
                            {profile.selectedInterests && (
                                <p> Mis intereses: {profile.selectedInterests.join(', ')}</p>
                            )}
                            <Link to={`/editProfile/${userId}`}>
                                <button className="me-3">Editar perfil</button> 
                            </Link>
                            {/* Vincula el botón de inscripciones */}
                            <Link to={`/inscripciones/${userId}`}>
                                <button>Tus eventos</button>
                            </Link>
                        </div>
                        <div className="me-5">
                        <GetUserPerfilImage />
                            {/* Pasa el userId como prop */}
                            <GetUserImages userId={userId || localStorage.getItem("userId") || store.user_id} />
                        </div>
                    </div>
                    <UserInterest />
                </>
            ) : (
                <p>Cargando perfil...</p>
            )}
        </div>
    );
};

export default Profile;



