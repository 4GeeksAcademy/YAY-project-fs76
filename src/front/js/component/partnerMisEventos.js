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
        actions.loadEventosConUsuarios()
            .then(() => {
                setLoading(false);
                console.log(store.eventos); // Inspecciona el contenido de store.eventos
            })
            .catch(err => {
                setLoading(false);
                setError("Error al cargar eventos");
            });
    }, [actions.loadEventosConUsuarios]);

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
                    <button className="btn" style={{ backgroundColor: '#A7D0CD', color: '#494949' }} onFocus={(e) => e.target.blur()}>Crear nuevo evento</button>
                </Link>
            </div>
            {loading ? (
                <p>Cargando eventos...</p>
            ) : (
                <ul className="list-group ">
                    {Array.isArray(store.eventos) && store.eventos
                        .filter(evento => evento.partner_id === store.partner_id) // Filtra solo los eventos del partner autenticado
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
                                            <i className="fa-solid fa-location-dot" style={{ color: '#7c488f' }}></i>  {evento.ciudad}
                                        </li>
                                        <li>
                                            <Link to={`/partner-evento/${evento.id}`} className="btn my-2" style={{ backgroundColor: '#A7D0CD', color: '#494949' }}>Ver detalles</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="d-flex justify-content-end align-items-start">
                                    {console.log('evento.partner_id:', evento.partner_id, 'store.partner_id:', store.partner_id)}
                                    {console.log(store.eventos)}
                                    {evento.partner_id === store.partner_id && (
                                        <>
                                            <button className="btn btn-icon"
                                                onClick={() => navigate(`/formulario-evento/${evento.id}`)} tabIndex="-1">
                                                <i className="fa-solid fa-pencil" style={{ color: '#7c488f' }} tabIndex="-1" />
                                            </button>

                                            <button className="btn btn-icon" onClick={() => handleDeleteClick(evento)} tabIndex="-1">
                                                <i className="fa-solid fa-trash" style={{ color: '#7c488f' }} tabIndex="-1" />
                                            </button>
                                        </>
                                    )}
                                </div>
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
                                                            style={{ width: '50px', height: '50px' }} />
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
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Advertencia</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setShowModalWarning(false)} aria-label="Close" onFocus={(e) => e.target.blur()}></button>
                            </div>
                            <div className="modal-body">
                                <p>Este evento tiene usuarios inscritos. Si lo eliminas, también se eliminarán los usuarios inscritos. ¿Estás seguro de que deseas continuar?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModalWarning(false)} onFocus={(e) => e.target.blur()}>Cancelar</button>
                                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete} onFocus={(e) => e.target.blur()}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModalDelete && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Eliminar Evento</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setShowModalDelete(false)} aria-label="Close" onFocus={(e) => e.target.blur()}></button>
                            </div>
                            <div className="modal-body">
                                <p>¿Estás seguro de que deseas eliminar este evento?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModalDelete(false)} onFocus={(e) => e.target.blur()}>Cancelar</button>
                                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete} onFocus={(e) => e.target.blur()}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
