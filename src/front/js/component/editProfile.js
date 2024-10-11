import React, { useState, useContext, useEffect } from "react";
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
    const [intereses, setIntereses] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const interesesSeleccionados = localStorage.getItem('selectedInterests');
        if (interesesSeleccionados) {
            setIntereses(JSON.parse(interesesSeleccionados));
        }
        const idToUse = userId || localStorage.getItem("userId") || store.user_id;
        if (idToUse) {
            actions.getProfile(idToUse)
                .then((data) => {
                    if (data) {
                        setProfile(data); // Establece el perfil en el estado local
                        setIntereses(data.intereses || []); // Establece los intereses en el estado local
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

    const handleInteresChange = (interes) => {
        if (intereses.includes(interes)) {
            setIntereses(intereses.filter((i) => i !== interes));
        } else {
            setIntereses([...intereses, interes]);
        }
        localStorage.setItem('selectedInterests', JSON.stringify(intereses)); // Update selected interests in localStorage
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const profileConIntereses = { ...profile, intereses };
        actions.completarDatos(userId, profileConIntereses.nombre, profileConIntereses.apellidos, profileConIntereses.fecha_nacimiento, profileConIntereses.direccion,profileConIntereses.latitud,profileConIntereses.longitud ,profileConIntereses.breve_descripcion, profileConIntereses.intereses)
          .then(() => {
            localStorage.setItem('selectedInterests', JSON.stringify(profileConIntereses.intereses));
            alert("Perfil actualizado exitosamente");
            navigate(`/profile/${userId}`); // Redirigir al perfil después de la actualización
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
                <div>
                    <label>Intereses:</label>

                    <div>

                        <button
                            type="button"
                            style={{
                                backgroundColor: intereses.includes("Deporte") ? "#007bff" : "",
                                color: intereses.includes("Deporte") ? "#ffffff" : "",
                                border: intereses.includes("Deporte") ? "none" : "",
                                padding: "10px 20px",
                                fontSize: "16px",
                                cursor: "pointer"
                            }}
                            onClick={() => handleInteresChange("Deporte")}
                        >
                            Deporte
                        </button>

                        <button
                            type="button"
                            style={{
                                backgroundColor: intereses.includes("Música") ? "#007bff" : "",
                                color: intereses.includes("Música") ? "#ffffff" : "",
                                border: intereses.includes("Música") ? "none" : "",
                                padding: "10px 20px",
                                fontSize: "16px",
                                cursor: "pointer"
                            }}

                            onClick={() => handleInteresChange("Música")}
                        >
                            Música
                        </button>

                        <button
                            type="button"
                            style={{
                                backgroundColor: intereses.includes("Cine") ? "#007bff" : "",
                                color: intereses.includes("Cine") ? "#ffffff" : "",
                                border: intereses.includes("Cine") ? "none" : "",
                                padding: "10px 20px",
                                fontSize: "16px",
                                cursor: "pointer"
                            }}
                            onClick={() => handleInteresChange("Cine")}
                        >
                            Cine
                        </button>

                        <button
                            type="button"
                            style={{
                                backgroundColor: intereses.includes("Literatura") ? "#007bff" : "",
                                color: intereses.includes("Literatura") ? "#ffffff" : "",
                                border: intereses.includes("Literatura") ? "none" : "",
                                padding: "10px 20px",
                                fontSize: "16px",
                                cursor: "pointer"
                            }}
                            onClick={() => handleInteresChange("Literatura")}
                        >
                            Literatura
                        </button>

                        <button
                            type="button"
                            style={{
                                backgroundColor: intereses.includes("Viajes") ? "#007bff" : "",
                                color: intereses.includes("Viajes") ? "#ffffff" : "",
                                border: intereses.includes("Viajes") ? "none" : "",
                                padding: "10px 20px",
                                fontSize: "16px",
                                cursor: "pointer"
                            }}
                            onClick={() => handleInteresChange("Viajes")}
                        >
                            Viajes
                        </button>
                    </div>
                </div>
                <div>
                    <label>Intereses seleccionados:</label>
                    <ul>
                        {intereses && intereses.map((interes, index) => (
                            <li key={index}>{interes}</li>
                        ))}
                    </ul>
                </div>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditProfile;