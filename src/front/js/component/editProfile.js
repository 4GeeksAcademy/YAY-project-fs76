import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext"; // Asegúrate de que la ruta sea correcta
import { useParams, useNavigate } from "react-router-dom";
import { Mapa } from "./mapa";

const EditProfile = () => {
    const { store, actions } = useContext(Context);
    const { userId } = useParams();
    const [profile, setProfile] = useState({
        nombre: '',
        apellidos: '',
        fecha_nacimiento: '',
        direccion: '',
        latitud: null,
        longitud: null,
        breve_descripcion: ''
    });

    const navigate = useNavigate(); // Para redirigir después de la edición

    useEffect(() => {
        // Verifica si el userId está en los parámetros, si no, obténlo de localStorage
        const idToUse = userId || localStorage.getItem("userId") || store.user_id;

        if (idToUse) {
            actions.getProfile(idToUse)
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
    }, [userId, store.user_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.completarDatos(userId, profile.nombre, profile.apellidos, profile.fecha_nacimiento, profile.direccion,profile.latitud, profile.longitud, profile.breve_descripcion)
            .then(() => {
                alert("Perfil actualizado exitosamente");
                navigate(`/profile/${userId}`);
            })
            .catch((error) => {
                console.error("Error al actualizar el perfil:", error);
                alert("Error al actualizar el perfil");
            });
    };

    return (
        <div>
            <h2>Editar Perfil</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={profile.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Apellidos:</label>
                    <input
                        type="text"
                        name="apellidos"
                        value={profile.apellidos}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Fecha de nacimiento:</label>
                    <input
                        type="date"
                        name="fecha_nacimiento"
                        value={profile.fecha_nacimiento}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Dirección:</label>
                    <Mapa
                        setDireccion={(direccion, latitud, longitud) => setProfile({
                            ...profile,
                            direccion,
                            latitud, 
                            longitud 
                        })}
                        initialDireccion={profile.direccion}
                    />
                </div>
                <div>
                    <label>Breve descripción:</label>
                    <textarea
                        name="breve_descripcion"
                        value={profile.breve_descripcion}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditProfile;
