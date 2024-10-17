import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { GetEventoImage } from "./getEventoImage";

export const Partner_Evento_Card = () => {
    const { store, actions } = useContext(Context);
    const [selectedUsuarios, setSelectedUsuarios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [eventoAEliminar, setEventoAEliminar] = useState(null);
    const [showModalWarning, setShowModalWarning] = useState(false);
    const [interes, setInteres] = useState(null);


    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.theid) {
            actions.loadEventosConUsuarios().then(() => {
                const eventoId = parseInt(params.theid);
                actions.getInteresPorEvento(eventoId).then((data) => {
                    if (data) {
                        setInteres(data); // Almacena el interés en el estado local
                    }
                }).catch(error => {
                    console.error("Error al cargar el interés:", error);
                });
            }).catch(error => {
                console.error("Error al cargar eventos:", error);
            });
        }
    }, []);

    const evento = store.eventos.find((evento) => evento.id === parseInt(params.theid));


    const handleShowModal = (usuarios) => {
        setSelectedUsuarios(usuarios);
        setShowModal(true);
    };

    const handleDeleteClick = (evento) => {
        if (evento.usuarios && evento.usuarios.length > 0) {
            setEventoAEliminar(evento);
            setShowModalWarning(true);
        } else {
            setEventoAEliminar(evento);
            setShowModalDelete(true);
        }
    };

    const handleConfirmDelete = () => {
        if (eventoAEliminar) {
            actions.deleteEvento(eventoAEliminar.id);
            navigate(-1);
        }
        setShowModalDelete(false);
        setEventoAEliminar(null);
    };

    return (
        <>
            {evento ? (
                <div className="container w-100 d-flex justify-content-center align-items-start shadow"> 

                    {evento.partner_id === parseInt(localStorage.getItem("partner_id")) && (
                        <>
                            <div className="card shadow-sm me-5 mt-5" style={{ width: '250px' }}>
                                <div className="card-body">

                                    <h5 className="text-center mb-3" style={{ color: '#7c488f' }}>Acciones del Evento</h5>
                                    <button className="btn mb-2 w-100" onClick={() => navigate(`/formulario-evento-editar/${evento.id}`)}>
                                        <i className="fa-solid fa-pencil me-2" style={{ color: '#7c488f' }} /> Editar Evento
                                    </button>
                                    <button className="btn text-danger w-100" onClick={() => handleDeleteClick(evento)}>
                                        <i className="fa-solid fa-trash me-2" style={{ color: '#7c488f' }} /> Eliminar Evento
                                    </button>

                                    <div className="mt-4">
                                        <h5 className="text-center mb-3" style={{ color: '#7c488f' }}>Usuarios Inscritos</h5>
                                        <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                                            {evento.usuarios && evento.usuarios.length > 0 ? (
                                                <>
                                                    {evento.usuarios.slice(0, 7).map((usuario, index) => (
                                                        <div key={index} style={{ textAlign: 'center' }}>
                                                            <img
                                                                src={usuario.foto_perfil || "https://i.ibb.co/4WsXL7Z/vector-logo.png" }
                                                                alt={usuario.nombre}
                                                                className="rounded-circle mb-1"
                                                                style={{ width: '50px', height: '50px' }}
                                                            />
                                                            <span className="badge" style={{ display: 'block', backgroundColor: '#7c488f' }}>{usuario.nombre}</span>
                                                        </div>
                                                    ))}
                                                    {evento.usuarios.length > 7 && (
                                                        <button
                                                            className="btn mb-1"
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                width: '50px',
                                                                height: '50px',
                                                                borderRadius: '50%',
                                                                backgroundColor: '#7c488f',
                                                                color: 'white',
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={() => handleShowModal(evento.usuarios)}
                                                        >
                                                            +{evento.usuarios.length - 7}
                                                        </button>
                                                    )}
                                                </>
                                            ) : (
                                                <p className="text-danger text-center fs-5">No hay usuarios inscritos.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                         </div>
                     </>
                    )}


                    <div className="card my-5" style={{ width: '500px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                        <div className="card-header p-0">
                            <GetEventoImage eventoId={evento.id} setImagenUrl={(url) => evento.foto_evento = url} partnerId={evento.partner_id === parseInt(localStorage.getItem("partner_id"))} />
                        </div>
                        <div className="card-body">
                            <h1 className="mb-3 mt-3" style={{ color: '#7c488f' }}>{evento.nombre}</h1>
                            <div className="d-flex justify-content-between mb-3 fs-5">
                                <span className="text-muted"><b>Fecha</b>: {evento.fecha}</span>
                                <span className="text-muted"><b>Horario</b>: {evento.horario}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 fs-5">
                                <span className="text-muted"><b>Accesibilidad</b>: {evento.accesibilidad ? 'Sí' : 'No'}</span>
                                <span className="text-muted"><b>Plazas</b>: {evento.cupo}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 fs-5">
                                <span className="text-muted"><b>Dificultad</b>: {evento.dificultad}</span>
                                <span className="text-muted"><b>Precio</b>: {evento.precio} €</span>
                            </div>
                            <span className="text-muted d-block mb-3 fs-5"><b>Ubicación</b>: {evento.direccion}</span>
                            <span className="text-muted d-block mb-3 fs-5"><b>Descripción</b>: {evento.breve_descripcion}</span>
                            <span className="text-muted d-block mb-3 fs-5"><b>Observaciones</b>: {evento.observaciones}</span>
                            <span className="text-muted d-block mb-3 fs-5"><b>Creador del evento</b>: {evento.partner_nombre}</span>
                            <span className="text-muted d-block mb-3 fs-5"><b>Interés</b>: {interes ? interes.nombre : 'No especificado'}</span>
                            <Link to="/partners-eventos">
                                <button className="btn btn btn-secondary me-5 float-end">Volver atrás</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className="m-5 p-3 alert-danger rounded">
                    <i className="fa-solid fa-triangle-exclamation"></i> Evento no encontrado
                </h1>
            )}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Usuarios Inscritos</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setShowModal(false)} aria-label="Close" onFocus={(e) => e.target.blur()}></button>
                            </div>
                            <div className="modal-body">
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {selectedUsuarios.map((usuario) => (
                                        <div key={usuario.id} style={{ textAlign: 'center' }}>
                                            <img
                                                src={usuario.foto_perfil || "https://i.ibb.co/4WsXL7Z/vector-logo.png" }
                                                alt={usuario.nombre}
                                                className="rounded-circle mb-1"
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                            <span className="badge" style={{ display: 'block', backgroundColor: '#7c488f' }}>{usuario.nombre}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} onFocus={(e) => e.target.blur()}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModalWarning && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Solicitud Cancelada</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalWarning(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body d-flex align-items-start">
                                <i className="fa-solid fa-circle-xmark fa-4x mx-2" style={{ color: '#7c488f' }}></i>
                                <div className="mx-3">
                                    <h4 className="mb-0" style={{ color: '#7c488f' }}>{eventoAEliminar ? eventoAEliminar.nombre : ''}</h4>
                                    <hr className="mt-0 mb-1" />
                                    <p>No puedes eliminar este evento porque hay usuarios inscritos. Contáctanos y te ayudamos a gestionarlo: gestion@yay.ia</p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModalWarning(false)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModalDelete && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Solicitud para eliminar un evento</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalDelete(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body d-flex align-items-start">
                                <i className="fa-solid fa-circle-exclamation fa-4x mx-2" style={{ color: '#7c488f' }}></i>
                                <div className="mx-3">
                                    <h4 className="mb-0" style={{ color: '#7c488f' }}>{eventoAEliminar ? eventoAEliminar.nombre : ''}</h4>
                                    <hr className="mt-0 mb-1" />
                                    <p>¿Estás seguro/a de que quieres eliminar este evento?</p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModalDelete(false)}>Cancelar</button>
                                <button type="button" className="btn text-white" style={{ backgroundColor: "#7c488f" }} onClick={handleConfirmDelete}>Eliminar evento</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

};

Partner_Evento_Card.propTypes = {
    match: PropTypes.object
};

