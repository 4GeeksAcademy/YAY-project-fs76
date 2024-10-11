import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Partner_Evento_Card = () => {
    const { store, actions } = useContext(Context);
    const [selectedUsuarios, setSelectedUsuarios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [eventoAEliminar, setEventoAEliminar] = useState(null);
    const [showModalWarning, setShowModalWarning] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        actions.loadEventosConUsuarios().then(() => {
            console.log(store.eventos); 
        });
    }, []);

    const evento = store.eventos.find((evento) => evento.id === parseInt(params.theid));

if (!evento) {
  console.log("Evento aún no disponible");
  return null; // O puedes mostrar un mensaje de carga en lugar de null
}

console.log("Evento seleccionado:", evento);

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
                <div className="container w-100 d-flex justify-content-center">
                    <div className="card my-5 d-flex flex-row w-100" key={evento.id} style={{ borderColor: '#ffc107' }}>
                        <div className="profile me-3 col-6">
                            <img src="https://cdn-icons-png.freepik.com/512/3544/3544735.png" alt="profileImage" className="rounded-circle w-75 m-4" />
                        </div>
                        <div className="my-5 w-100">
                            <h2 className="mb-3" style={{ color: '#7c488f' }}>{evento.nombre}</h2>
                            <span className="text-muted d-block mb-3">
                                <b>Fecha</b>: {evento.fecha}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Horario</b>: {evento.horario}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Ciudad</b>: {evento.ciudad}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Plazas</b>: {evento.cupo}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Dificultad</b>: {evento.dificultad}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Precio</b>: {evento.precio}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Accesibilidad</b>: {evento.accesibilidad}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Observaciones</b>: {evento.observaciones}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Descripción</b>: {evento.breve_descripcion}
                            </span>
                            <span className="text-muted d-block mb-3">
                            <b>Creador del evento</b>: {evento.partner_nombre}
                             </span>

                            <div className="usuarios-inscritos my-3 me-5">
                                <h5 style={{ color: '#7c488f' }}><b>Usuarios Inscritos</b></h5>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                {evento.usuarios && evento.usuarios.length > 0 ? (
                                        <>
                                       {evento.usuarios.slice(0, 7).map((usuario, index) => (
                                            <div key={index} style={{ textAlign: 'center' }}>
                                                <img
                                                    src={usuario.foto_perfil || "https://i.ibb.co/tbbV6G0/yay-fondo.png"}
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
                                        <p className="text-danger">No hay usuarios inscritos.</p>
                                    )}
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-end">
                                {evento.partner_id === store.partner_id && (
                                    <div>
                                        <Link to={`/formulario-evento/${evento.id}`}>
                                            <button className="btn btn-icon" style={{ color: '#7c488f' }}>
                                                <i className="fa-solid fa-pencil" />
                                            </button>
                                        </Link>
                                        <button className="btn btn-icon" style={{ color: '#7c488f' }} onClick={() => handleDeleteClick(evento)}>
                                            <i className="fa-solid fa-trash" />
                                        </button>
                                    </div>
                                )}
                                <Link to="/partners-eventos">
                                    <button className="btn btn btn-secondary me-5">Volver atrás</button>
                                </Link>
                                </div>

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
                                                src={usuario.foto_perfil || "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"}
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
                                <i class="fa-solid fa-circle-xmark fa-4x mx-2" style={{ color: '#7c488f' }}></i>
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
                                <button type="button" className="btn text-white" style={{ backgroundColor: "#de8f79" }} onClick={handleConfirmDelete}>Eliminar evento</button>
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