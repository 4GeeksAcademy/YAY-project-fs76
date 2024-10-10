import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext"; // Asegúrate de que la ruta sea correcta
import { useParams, useNavigate } from "react-router-dom";

const EditPartnerProfile = () => {
    const { store, actions } = useContext(Context);
    const { partnerId } = useParams(); // Obtén partnerId de los parámetros de la URL
    const [profile, setProfile] = useState({
        nombre: '',
        nif: '',
        ciudad: '',
        sector: '',
        entidad_id: ''
    });
    const [alert, setAlert] = useState(null); // Para las alertas
    const navigate = useNavigate(); // Para redirigir después de la edición

    useEffect(() => {
        // Verifica si el partnerId está en los parámetros
        const idToUse = partnerId || localStorage.getItem("partnerId") || store.partner_id;

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
            console.error("No se proporcionó partnerId");
        }
    }, [partnerId, store.partner_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const idToUse = partnerId || localStorage.getItem("partnerId") || store.partner_id;

        // Llamamos a updatePartnerProfile en lugar de completarDatos
        actions.updatePartnerProfile(idToUse, profile, 
            () => {
                setAlert({ type: 'success', message: 'Perfil actualizado exitosamente' });
                setTimeout(() => {
                    navigate(`/partner-profile/${idToUse}`); // Redirigir al perfil después de la actualización
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
            <h1 className="text-center">Editar Perfil del Partner</h1>
            {alert && (
                <div className={`alert fade show alert-${alert.type}`} role="alert">
                    {alert.type === 'danger' ? <i className="fa-solid fa-triangle-exclamation"></i> : <i className="fa-solid fa-circle-check"></i>}
                    {alert.message}
                    <i type="button" className="btn-close float-end" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></i>
                </div>
            )}
            <form onSubmit={handleSubmit} className="m-5 mx-auto w-75">
                <div className="mb-3">
                    <label htmlFor="nombreInput" className="form-label">Nombre</label>
                    <input type="text" name="nombre" value={profile.nombre} onChange={handleChange} className="form-control" id="nombreInput" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="nifInput" className="form-label">NIF</label>
                    <input type="text" name="nif" value={profile.nif} onChange={handleChange} className="form-control" id="nifInput" />
                </div>
                <div className="mb-3">
                    <label htmlFor="ciudadInput" className="form-label">Ciudad</label>
                    <input type="text" name="ciudad" value={profile.ciudad} onChange={handleChange} className="form-control" id="ciudadInput" />
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
                    <button type="submit" className="btn btn-primary w-100">Guardar Cambios</button>
                </div>
            </form>
        </div>
    );
};

export default EditPartnerProfile;
