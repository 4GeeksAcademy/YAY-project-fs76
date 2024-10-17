import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import "../../../styles/partnerProfiles.css";

export const Partner_Perfil = () => {
    const { store, actions } = useContext(Context);
    const { partnerId } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        nombre: '',
        nif: '',
        direccion: '',
        sector: '',
        entidad_id: '',
        image: ''
    });
//
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
        <>                <header className="profile-header text-center">
        <h1 className="text-white">Mi Perfil de Partner</h1>
    </header>
        <div className="container-fluid perfil-container">
            <div className="row justify-content-center">
                <div className="col-md-3 sidebar my-auto pb-3">
                    <h3 className="text-center fs-3" style={{ color: '#7c488f' }}>Menú</h3>
                    <ul className="list-group">
                        <li className="list-group-item fs-5" onClick={() => navigate(`/editPartnerProfile/${partnerId}`)}>Editar Perfil</li>
                        <li className="list-group-item fs-5" onClick={() => navigate(`/formulario-evento`)}>Crear Evento</li>
                        <li className="list-group-item fs-5" onClick={() => navigate(`/partner-mis-eventos/${partnerId}`)}>Mis Eventos</li>
                        <li className="list-group-item fs-5" onClick={() => navigate(`/partners-home`)}>Home</li>
                        <li className="list-group-item fs-5"onClick={() => navigate(`/#land-contacto`)}>Contactar con Yay</li>
                        <li className="list-group-item fs-5"onClick={() => navigate(`/#land-contacto`)}>Pedir Ayuda</li>
                        <li className="list-group-item fs-5" onClick={() => navigate(`/sobre-nosotros`)}>Sobre Nosotros</li>
                    </ul>
                </div>
                <div className="col-md-8">
                    <div className="card p-4 profile-card shadow" style={{ backgroundColor: 'white', border: 'none' }}>
                        <h2 className="mb-4 " style={{ color: '#7c488f' }}>Información</h2>
                        <div className="form-group mb-3 fs-5">
                            <label><strong>Nombre</strong></label>
                            <p>{profile.nombre}</p>
                        </div>
                        <div className="form-group mb-3 fs-5">
                            <label><strong>NIF o DNI</strong></label>
                            <p>{profile.nif}</p>
                        </div>
                        <div className="form-group mb-3 fs-5">
                            <label><strong>Dirección</strong></label>
                            <p>{profile.direccion}</p>
                        </div>
                        <div className="form-group mb-3 fs-5">
                            <label><strong>Sector</strong></label>
                            <p>{profile.sector}</p>
                        </div>
                        <div className="form-group mb-3 fs-5">
                            <label><strong>Entidad ID</strong></label>
                            <p>{tipoEntidad}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};