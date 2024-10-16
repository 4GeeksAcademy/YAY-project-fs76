import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import { Mapa } from "./mapa";
import GetUserPerfilImage from "./getUserPerfilImage";


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
        breve_descripcion: '',
        telefono: '',
        genero: ''
    });
    const [intereses, setIntereses] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
                        setProfile(data);
                        setIntereses(data.intereses || []);
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
        localStorage.setItem('selectedInterests', JSON.stringify(intereses));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const profileConIntereses = { ...profile, intereses };
        actions.completarDatos(
            userId,
            profileConIntereses.nombre,
            profileConIntereses.apellidos,
            profileConIntereses.fecha_nacimiento,
            profileConIntereses.direccion,
            profileConIntereses.latitud,
            profileConIntereses.longitud,
            profileConIntereses.breve_descripcion,
            profileConIntereses.telefono,
            profileConIntereses.genero,
            profileConIntereses.intereses
        )
            .then(() => {
                localStorage.setItem('selectedInterests', JSON.stringify(profileConIntereses.intereses));
                // alert("Perfil actualizado exitosamente");
                navigate(`/profile/${userId}`);
            })
            .catch((error) => {
                console.error("Error al actualizar el perfil:", error);
                // alert("Error al actualizar el perfil");
            });
    };

    const handleDeleteAccount = () => {
        // Aquí va la lógica para eliminar la cuenta
        actions.deleteAccount(userId)
            .then(() => {
                // alert("Cuenta eliminada exitosamente");
                navigate('/'); // Redirigir al inicio
            })
            .catch((error) => {
                console.error("Error al eliminar la cuenta:", error);
                // alert("Error al eliminar la cuenta");
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center" style={{ color: "#7c488f", fontSize: "2rem" }}>Editar Información Personal</h2>
            <div className="col-md-3">
                <GetUserPerfilImage />
            </div>
            <form onSubmit={handleSubmit} className="p-4" style={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #ddd" }}>
                <div className="form-group mb-3">
                    <label className="form-label" style={{ fontSize: "1.2rem", color: "#000" }}>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={profile.nombre}
                        onChange={handleChange}
                        className="form-control"
                        required
                        style={{ fontSize: "1.1rem" }}
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" style={{ fontSize: "1.2rem", color: "#000" }}>Apellidos:</label>
                    <input
                        type="text"
                        name="apellidos"
                        value={profile.apellidos}
                        onChange={handleChange}
                        className="form-control"
                        style={{ fontSize: "1.1rem" }}
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" style={{ fontSize: "1.2rem", color: "#000" }}>Fecha de nacimiento:</label>
                    <input
                        type="date"
                        name="fecha_nacimiento"
                        value={profile.fecha_nacimiento}
                        onChange={handleChange}
                        className="form-control"
                        style={{ fontSize: "1.1rem" }}
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" style={{ fontSize: "1.2rem", color: "#000" }}>Teléfono:</label>
                    <input
                        type="tel"
                        name="telefono"
                        value={profile.telefono}
                        onChange={handleChange}
                        className="form-control"
                        style={{ fontSize: "1.1rem" }}
                        placeholder="Número de teléfono"
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" style={{ fontSize: "1.2rem", color: "#000" }}>Género:</label>
                    <select
                        name="genero"
                        value={profile.genero}
                        onChange={handleChange}
                        className="form-control"
                        style={{ fontSize: "1.1rem" }}
                    >
                        <option value="">Seleccione...</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" style={{ fontSize: "1.2rem", color: "#000" }}>Dirección:</label>
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
                <div className="form-group mb-3">
                    <label className="form-label" style={{ fontSize: "1.2rem", color: "#000" }}>Breve descripción:</label>
                    <textarea
                        name="breve_descripcion"
                        value={profile.breve_descripcion}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        style={{ fontSize: "1.1rem" }}
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" style={{ fontSize: "1.2rem", color: "#000" }}>Intereses:</label>
                    <div className="d-flex flex-wrap">
                        {["Deporte", "Música", "Cine", "Literatura", "Viajes"].map((interes) => (
                            <button
                                type="button"
                                key={interes}
                                className={`btn ${intereses.includes(interes) ? "text-white" : "btn-outline-dark"} me-2 mb-2`}
                                style={{
                                    backgroundColor: intereses.includes(interes) ? "#7c488f" : "transparent",
                                    borderColor: "#7c488f",
                                    color: intereses.includes(interes) ? "#fff" : "#000",
                                }}
                                onClick={() => handleInteresChange(interes)}
                            >
                                {interes}
                            </button>
                        ))}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#7c488f", borderColor: "#7c488f", fontSize: "1.2rem" }}>Guardar Cambios</button>

                <div className="mt-4">
                    <h4 className="text-danger">Eliminar Cuenta</h4>
                    <p style={{ fontSize: "1rem", color: "#000" }}>
                        ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
                    </p>
                    <button
                        className="btn btn-danger"
                        style={{ fontSize: "1rem", width: "auto" }}
                        onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                    >
                        {showDeleteConfirm ? "Cancelar" : "Eliminar Cuenta"}
                    </button>
                    {showDeleteConfirm && (
                        <div className="mt-2">
                            <p>Confirmas que deseas eliminar tu cuenta. Esto es irreversible.</p>
                            <button
                                className="btn btn-danger"
                                style={{ fontSize: "1rem", width: "auto" }}
                                onClick={handleDeleteAccount}
                            >
                                Confirmar Eliminación
                            </button>
                        </div>
                    )}
                </div>

            </form>
        </div>
    );
};

export default EditProfile;
