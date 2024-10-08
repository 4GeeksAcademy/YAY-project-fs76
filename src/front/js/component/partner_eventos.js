import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Partner_Eventos = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedUsuarios, setSelectedUsuarios] = useState([]);

    useEffect(() => {
        actions.loadEventosConUsuarios()
            .then(() => setLoading(false))
            .catch(err => {
                setLoading(false);
                setError("Error al cargar eventos");
            });
    }, [actions.loadEventosConUsuarios]);

    const handleShowModal = (usuarios) => {
        setSelectedUsuarios(usuarios);
        setShowModal(true);
    };

    return (
        <div className="container m-5 mx-auto w-75">
            {error && <p className="text-danger">{error}</p>}
            <div className="d-flex justify-content-end mb-3">
                <Link to="/formulario-evento">
                    <button className="btn" style={{ backgroundColor: '#A7D0CD' }} onFocus={(e) => e.target.blur()}>Crear nuevo evento</button>
                </Link>
            </div>
            {loading ? (
                <p>Cargando eventos...</p>
            ) : (
                <ul className="list-group ">
                    {Array.isArray(store.eventos) && store.eventos.map((evento) => (
                        <li key={evento.id} className="list-group-item d-flex justify-content-between">
                            <div className="d-flex justify-content-between flex-grow-1">
                                <img
                                    src="https://cdn-icons-png.freepik.com/512/3544/3544735.png"
                                    alt="profileImage"
                                    className="rounded-circle my-auto ms-4"
                                    style={{ height: '100%', maxHeight: '100px' }}
                                />
                                <ul className="ms-5 flex-grow-1" style={{ listStyle: 'none', padding: 0 }}>
                                    <li className="fs-3 ">{evento.nombre}</li>
                                    <li className="text-muted fs-5">
                                        <i className="fa-solid fa-calendar-days"></i> {evento.fecha}
                                    </li>
                                    <li className="text-muted fs-6">
                                        <i className="fa-solid fa-clock"></i> {evento.horario}
                                    </li>
                                    <li className="text-muted fs-7">
                                        <i className="fa-solid fa-location-dot"></i>  {evento.ciudad}
                                    </li>
                                    <li>
                                        <Link to={`/evento/${evento.id}`} className="btn" style={{ backgroundColor: '#A7D0CD' }}>Saber más</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex justify-content-end align-items-start">
                                <Link to={`/formulario-evento/${evento.id}`}>
                                    <button className="btn btn-icon">
                                        <i className="fa-solid fa-pencil" />
                                    </button>
                                </Link>
                                <button className="btn btn-icon" onClick={() => {
                                    actions.deleteEvento(evento.id);
                                }}>
                                    <i className="fa-solid fa-trash" />
                                </button>
                            </div>
                            <div className="usuarios-inscritos position-absolute bottom-0 end-0 mb-3 me-3">
                                <h5 style={{ textAlign: 'right', margin: 0, color: '#7c488f' }}><b>plazas reservadas</b></h5>
                                <hr className="mt-0 mb-1" style={{ color: '#A7D0CD', borderWidth: '2px' }}></hr>
                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                    {evento.usuarios && evento.usuarios.length > 0 ? (
                                        <>
                                            {evento.usuarios.slice(0, 4).map((usuario, index) => (
                                                <div key={index} style={{ textAlign: 'center' }}>
                                                    <img
                                                        src={"https://cdn.icon-icons.com/icons2/3868/PNG/512/profile_circle_icon_242774.png"}
                                                        alt={usuario}
                                                        className="rounded-circle"
                                                        style={{ width: '50px', height: '50px' }}
                                                    />
                                                    <span className="badge" style={{ display: 'block', backgroundColor: '#7c488f' }}>{usuario}</span>
                                                </div>
                                            ))}
                                            {evento.usuarios.length > 4 && (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#7c488f',
                                                        color: 'white',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => handleShowModal(evento.usuarios)}
                                                >
                                                    +{evento.usuarios.length - 4}
                                                </div>
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
            <Link to="/">
                <button className="btn mt-5" style={{ backgroundColor: '#A7D0CD' }}>Back home</button>
            </Link>
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
                        {selectedUsuarios.map((usuario, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <img
                                    src={"https://cdn.icon-icons.com/icons2/3868/PNG/512/profile_circle_icon_242774.png"}
                                    alt={usuario}
                                    className="rounded-circle"
                                    style={{ width: '50px', height: '50px' }}
                                />
                                <span className="badge" style={{ display: 'block', backgroundColor: '#7c488f' }}>{usuario}</span>
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
        </div>
    );
};