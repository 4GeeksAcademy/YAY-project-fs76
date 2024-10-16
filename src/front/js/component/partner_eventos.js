import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import { GetEventoImage } from "./getEventoImage";
import "../../styles/home.css";

export const Partner_Eventos = () => {
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
        actions.loadEventosConUsuarios()
            .then(() => {
                setLoading(false);
                console.log(store.eventos); 
            })
            .catch(err => {
                setLoading(false);
                setError("Error al cargar eventos");
            });
    }, []);

    const handleShowModal = (usuarios) => {
        setSelectedUsuarios(usuarios);
        setShowModal(true);
    };

    const handleDeleteClick = (evento) => {
        if (evento.usuarios && evento.usuarios.length > 0) {
            // Si hay usuarios inscritos, mostrar un modal de advertencia
            setEventoAEliminar(evento);
            setShowModalWarning(true);
        } else {
            // Si no hay usuarios, proceder a mostrar el modal de confirmación
            setEventoAEliminar(evento);
            setShowModalDelete(true);
        }
    };

    const handleConfirmDelete = () => {
        if (eventoAEliminar) {
            actions.deleteEvento(eventoAEliminar.id);
        }
        setShowModalDelete(false);
        setEventoAEliminar(null);
    };

    return (
        <div className="container m-5 mx-auto w-75">
            {error && <p className="text-danger">{error}</p>}
            <div className="d-flex justify-content-end mb-3">
                <Link to="/formulario-evento">
                    <button className="btn" style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#7c488f', color: 'white' }} onFocus={(e) => e.target.blur()}>Crear nuevo evento</button>
                </Link>
            </div>
            {loading ? (
                <p>Cargando eventos...</p>
            ) : (
                <ul className="list-group ">
                    {Array.isArray(store.eventos) && store.eventos.map((evento) => (
                        <li key={evento.id} className="list-group-item d-flex justify-content-between" style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', border: 'none', marginBottom: '10px' }}>
                            <div className="d-flex justify-content-between flex-grow-1">
                            <div style={{ width: '300px', height: 'auto', margin: '0' }}>
                            <GetEventoImage eventoId={evento.id} setImagenUrl={(url) => evento.foto_evento = url} partnerId={evento.partner_id === parseInt(localStorage.getItem("partner_id"))} />
                                </div>
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
                                        <Link to={`/partner-evento/${evento.id}`} className="btn my-2" style={{ backgroundColor: '#7c488f', color: 'white' }}>Ver detalles</Link>
                                    </li>
                                </ul>
                            </div>
                            {/* Botones de editar y eliminar */}
                            {evento.partner_id === parseInt(localStorage.getItem("partner_id")) && (
                                <div className="d-flex justify-content-end align-items-start">
                                    <button className="btn btn-icon"
                                        onClick={() => navigate(`/formulario-evento-editar/${evento.id}`)} tabIndex="-1">
                                        <i className="fa-solid fa-pencil" style={{ color: '#7c488f' }} tabIndex="-1" />
                                    </button>

                                    <button className="btn btn-icon" onClick={() => handleDeleteClick(evento)} tabIndex="-1">
                                        <i className="fa-solid fa-trash" style={{ color: '#7c488f' }} tabIndex="-1" />
                                    </button>
                                </div>
                            )}
                            {evento.partner_id === parseInt(localStorage.getItem("partner_id")) && (
                                <div className="usuarios-inscritos position-absolute bottom-0 end-0 mb-3 me-3">
                                    <h5 style={{ textAlign: 'right', margin: 0, color: '#7c488f' }}><b>plazas reservadas</b></h5>
                                    <hr className="mt-0 mb-1" style={{ color: '#ffc107', borderWidth: '2px' }}></hr>
                                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                        {evento.usuarios && evento.usuarios.length > 0 ? (
                                            <>
                                                {evento.usuarios.slice(0, 4).map((usuario, index) => (
                                                    <div key={index} style={{ textAlign: 'center' }}>
                                                        <img
                                                            src={usuario.foto_perfil || "https://i.ibb.co/tbbV6G0/yay-fondo.png"}
                                                            alt={usuario}
                                                            className="rounded-circle mb-1"
                                                            style={{ width: '50px', height: '50px' }}
                                                        />
                                                        <span className="badge" style={{ display: 'block', backgroundColor: '#7c488f' }}>{usuario.nombre}</span>
                                                    </div>
                                                ))}
                                                {evento.usuarios.length > 4 && (
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
                                                        +{evento.usuarios.length - 4}
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <p className="text-danger text-center">Aún no hay<br />plazas reservadas</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
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
                                                src={usuario.foto_perfil || "https://i.ibb.co/tbbV6G0/yay-fondo.png"}
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
        </div>
    );
};