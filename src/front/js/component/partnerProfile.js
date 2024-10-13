import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/partnerProfiles.css";
import fondoPartner from "../../../../docs/assets/fondoPartner.webp"; // Asegúrate de que esta ruta sea correcta

const PartnerProfile = () => {
    const { store, actions } = useContext(Context);
    const { partnerId } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        nombre: '',
        nif: '',
        direccion: '',
        sector: '',
        entidad_id: '',
        image: ''  // Este campo se puede eliminar si no lo necesitas
    });

    useEffect(() => {
        if (partnerId) {
            actions.getEntidades();
            actions.getPartnerProfile(partnerId)
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
            console.error("No se proporcionó partnerId");
        }
    }, [partnerId]);

    const entidad = store.entidades.find(entidad => entidad.id === profile.entidad_id);
    const tipoEntidad = entidad ? entidad.tipo : 'Entidad no encontrada';

    return (
        <div className="container-fluid perfil-container" style={{ backgroundImage: `url(${fondoPartner})` }}>
            <div className="row">
                <div className="col-md-3 sidebar">
                    <h5 className="text-center" style={{ color: '#7c488f' }}>Menú</h5>
                    <ul className="list-group">
                        <li className="list-group-item" onClick={() => navigate(`/editPartnerProfile/${partnerId}`)}>Editar Perfil</li>
                        <li className="list-group-item" onClick={() => navigate(`/formulario-evento`)}>Crear Evento</li>
                        <li className="list-group-item" onClick={() => navigate(`/partner-mis-eventos/${partnerId}`)}>Mis Eventos</li>
                        <li className="list-group-item" onClick={() => navigate(`/partners_home`)}>Home</li>
                        <li className="list-group-item" onClick={() => navigate(`/contactar`)}>Contactar con Yay</li>
                        <li className="list-group-item" onClick={() => navigate(`/pedir-ayuda`)}>Pedir Ayuda</li>
                        <li className="list-group-item" onClick={() => navigate(`/sobre-nosotros`)}>Sobre Nosotros</li>
                    </ul>
                </div>
                <div className="col-md-9">
                    <div className="card p-4 profile-card shadow-sm">
                        <h4 className="mb-4" style={{ color: '#7c488f' }}>Información del Partner</h4>
                        <div className="form-group mb-3">
                            <label><strong>Nombre:</strong></label>
                            <p>{profile.nombre}</p>
                        </div>
                        <div className="form-group mb-3">
                            <label><strong>NIF o DNI:</strong></label>
                            <p>{profile.nif}</p>
                        </div>
                        <div className="form-group mb-3">
                            <label><strong>Dirección:</strong></label>
                            <p>{profile.direccion}</p>
                        </div>
                        <div className="form-group mb-3">
                            <label><strong>Sector:</strong></label>
                            <p>{profile.sector}</p>
                        </div>
                        <div className="form-group mb-3">
                            <label><strong>Entidad ID:</strong></label>
                            <p>{tipoEntidad}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerProfile;
