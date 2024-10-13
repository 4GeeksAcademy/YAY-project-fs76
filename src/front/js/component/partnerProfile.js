import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import empresaColaboradoraYay from "../../../../docs/assets/PartnerPerfil.webp"; // Aquí importas correctamente la imagen
const API_BASE_URL = "https://tu-api-url.com";
import "../../styles/imagenes.css";
import { PartnerMisEventos } from "./partner_mis_eventos";

const PartnerProfile = () => {
    const { store, actions } = useContext(Context);
    const { partnerId } = useParams();
    const navigate = useNavigate(); // Inicializa useNavigate
    const [profile, setProfile] = useState({
        nombre: '',
        nif: '',
        direccion: '',
        sector: '',
        entidad_id: '',
        image: '' 
    });
    const [direccion, setDireccion] = useState("");

    useEffect(() => {
        if (partnerId) {
            actions.getEntidades();
            actions.getPartnerProfile(partnerId)
                .then((data) => {
                    if (data) {
                        setProfile(data);
                        setDireccion(data.direccion);
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8">
                    <div className="card p-4 shadow-sm">
                        <div className="row">
                            <div className="col-md-3 text-center">
                                {/* Imagen de perfil con estilo circular */}
                                <img
                                    src={empresaColaboradoraYay} // Aquí usas la variable que importaste
                                    alt="Perfil del Partner"
                                    className="img-fluid rounded-circle mb-4 partnerPerfil"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                                <Link to={`/editPartnerProfile/${partnerId}`}>
                                    <button className="btn btn-primary" style={{ backgroundColor: '#A7D0CD', color: '#494949' }}>
                                        Editar perfil
                                    </button>
                                </Link>
                            </div>
                            <div className="col-md-9">
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
                <div className="col-md-4 d-flex flex-column justify-content-start">
                    <button
                        className="btn me-3 mb-2"
                        onClick={() => navigate(`/partner-mis-eventos/${partnerId}`)} // Utiliza el partnerId verificado
                        style={{ backgroundColor: '#7c488f', color: 'white' }}
                    >
                        Mis Eventos
                    </button>
                    <button
                        className="btn"
                        onClick={() => navigate(`/formulario-evento`)} // Redirige a la ruta para crear un nuevo evento
                        style={{ backgroundColor: '#A7D0CD', color: '#494949' }}
                    >
                        Crear Evento
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PartnerProfile;
