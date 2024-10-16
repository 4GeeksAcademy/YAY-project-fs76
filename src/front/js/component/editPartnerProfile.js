import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext"; // Asegúrate de que la ruta sea correcta
import { useParams, useNavigate } from "react-router-dom";
import { Mapa } from "./mapa";

const EditPartnerProfile = () => {
    const { store, actions } = useContext(Context);
    const { partnerId } = useParams(); // Obtén partnerId de los parámetros de la URL
    const [profile, setProfile] = useState({
        nombre: '',
        nif: '',
        direccion: '',
        latitud: '',
        longitud: '',
        sector: '',
        entidad_id: ''
    });
    const [alert, setAlert] = useState(null); // Para las alertas
    const navigate = useNavigate(); // Para redirigir después de la edición
    const [direccion, setDireccion] = useState("");

    useEffect(() => {
        if (partnerId) {
            actions.getEntidades();
            actions.getPartnerProfile(partnerId)
                .then((data) => {
                    if (data) {
                        setProfile(data); // Establece el perfil en el estado local
                        setDireccion(data.direccion); // Establece la dirección en el estado local
                    } else {
                        console.error("No se pudo obtener el perfil");
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener el perfil:", error);
                });
        } else {
            console.error("No se proporcionó partnerId");
        }
    }, [partnerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        actions.updatePartnerProfile(partnerId, profile,
            () => {
                setAlert({ type: 'success', message: 'Perfil actualizado exitosamente' });
                setTimeout(() => {
                    navigate(`/partner-profile/${partnerId}`); // Redirigir al perfil después de la actualización
                }, 1000);
            },
            (error) => {
                console.error("Error al actualizar el perfil:", error);
                setAlert({ type: 'danger', message: 'Error al actualizar el perfil' });
            }
        );
    };

    return (
        <div>

            
            <form onSubmit={handleSubmit} className="container m-5 mx-auto w-50" style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <h1 className="text-center">Editar Perfil del Partner</h1>
            {alert && (
                <div className={`alert fade show alert-${alert.type}`} role="alert">
                    {alert.type === 'danger' ? <i className="fa-solid fa-triangle-exclamation"></i> : <i className="fa-solid fa-circle-check"></i>}
                    {alert.message}
                    <i type="button" className="btn-close float-end" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></i>
                </div>
            )}
                <div className="mb-3">
                    <label htmlFor="nombreInput" className="form-label">Nombre</label>
                    <input type="text" name="nombre" value={profile.nombre} onChange={handleChange} className="form-control" id="nombreInput" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="nifInput" className="form-label">NIF o DNI</label>
                    <input type="text" name="nif" value={profile.nif} onChange={handleChange} className="form-control" id="nifInput" />
                </div>
                <div className="mb-3">
                    <Mapa
                        setDireccion={(direccion, latitud, longitud) => setProfile({
                            ...profile,
                            direccion,
                            latitud,
                            longitud
                        })}
                        initialDireccion={direccion}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="sectorInput" className="form-label">Sector</label>
                    <input type="text" name="sector" value={profile.sector} onChange={handleChange} className="form-control" id="sectorInput" />
                </div>
                <div className="mb-3">
                    <label htmlFor="entidad_idInput" className="form-label">Tipo de entidad</label>
                    <select
                        name="entidad_id"
                        value={profile.entidad_id}
                        onChange={handleChange}
                        className="form-control"
                        id="entidad_idInput"
                    >
                        <option value="">Seleccione una entidad</option>
                        {store.entidades.map((entidad) => (
                            <option key={entidad.id} value={entidad.id}>
                                {entidad.tipo}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn w-100" style={{ backgroundColor: '#7c488f', color: 'white' }} onFocus={(e) => e.target.blur()}>Guardar Cambios</button>
                </div>
            </form>
        </div>
    );
};

export default EditPartnerProfile;