import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import "../../styles/home.css";

export const PartnerMisEventos = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedUsuarios, setSelectedUsuarios] = useState([]);
    const navigate = useNavigate();
    const isAuthenticated = store.auth;
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [eventoAEliminar, setEventoAEliminar] = useState(null);
    const [showModalWarning, setShowModalWarning] = useState(false);

    if (!isAuthenticated) {
        return <Navigate to="/notFound" />;
    }

    useEffect(() => {
        const partnerId = localStorage.getItem("partner_id"); // Obtén el partner_id desde localStorage
        console.log("parnerId:",partnerId);
        if (partnerId) {
            actions.loadEventosConUsuarios()
                .then(() => {
                    setLoading(false);
                    console.log(store.eventos); // Inspecciona el contenido de store.eventos
                })
                .catch(err => {
                    setLoading(false);
                    setError("Error al cargar eventos");
                });
        }
    }, [actions.loadEventosConUsuarios]);
    
    return (
        <div className="container m-5 mx-auto w-75">
            {error && <p className="text-danger">{error}</p>}
            <div className="d-flex justify-content-end mb-3">
                <Link to="/formulario-evento">
                    <button className="btn" style={{ backgroundColor: '#A7D0CD', color: '#494949' }} onFocus={(e) => e.target.blur()}>Crear nuevo evento</button>
                </Link>
            </div>
            {loading ? (
                <p>Cargando eventos...</p>
            ) : (
                <ul className="list-group">
                    {Array.isArray(store.eventos) && store.eventos
                        .filter(evento => evento.partner_id === parseInt(localStorage.getItem("partner_id"))) // Filtra por partner_id
                        .map((evento) => (
                            <li key={evento.id} className="list-group-item d-flex justify-content-between" style={{ borderColor: '#ffc107' }}>
                                <div className="d-flex justify-content-between flex-grow-1">
                                    <img
                                        src="https://cdn-icons-png.freepik.com/512/3544/3544735.png"
                                        alt="profileImage"
                                        className="rounded-circle my-auto ms-4"
                                        style={{ height: '100%', maxHeight: '100px' }}
                                    />
                                    <ul className="ms-5 flex-grow-1" style={{ listStyle: 'none', padding: 0 }}>
                                        <li className="fs-3" style={{ color: '#7c488f' }}>{evento.nombre}</li>
                                        <li className="text-muted fs-5">
                                            <i className="fa-solid fa-calendar-days" style={{ color: '#7c488f' }}></i> {evento.fecha}
                                        </li>
                                        <li className="text-muted fs-6">
                                            <i className="fa-solid fa-clock" style={{ color: '#7c488f' }}></i> {evento.horario}
                                        </li>
                                        <li className="text-muted fs-7">
                                            <i className="fa-solid fa-location-dot" style={{ color: '#7c488f' }}></i>  {evento.direccion}
                                        </li>
                                        <li>
                                            <Link to={`/partner-evento/${evento.id}`} className="btn my-2" style={{ backgroundColor: '#A7D0CD', color: '#494949' }}>Ver detalles</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="d-flex justify-content-end align-items-start">
                                    <button className="btn btn-icon"
                                        onClick={() => navigate(`/formulario-evento/${evento.id}`)} tabIndex="-1">
                                        <i className="fa-solid fa-pencil" style={{ color: '#7c488f' }} tabIndex="-1" />
                                    </button>
    
                                    <button className="btn btn-icon" onClick={() => handleDeleteClick(evento)} tabIndex="-1">
                                        <i className="fa-solid fa-trash" style={{ color: '#7c488f' }} tabIndex="-1" />
                                    </button>
                                </div>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};    