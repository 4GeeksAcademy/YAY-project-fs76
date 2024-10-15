import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams, Link } from "react-router-dom";

export const MisEventos = () => {
    const { store, actions } = useContext(Context);
    const { userId } = useParams();
    const [misEventos, setMisEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventos = async () => {
            setLoading(true);
            const eventosInscritos = [];
            for (const evento of store.eventos) {
                const { inscrito, id } = await actions.getInscripcionUsuarioEventoInscrito(userId, evento.id);
                if (inscrito) {
                    eventosInscritos.push({ ...evento, inscripcionId: id });
                }
            }
            setMisEventos(eventosInscritos);
            setLoading(false);
        };

        fetchEventos();
    }, [store.eventos, userId, actions]);

    return (
        <>
            {loading ? (
                <p>Cargando tus eventos...</p>
            ) : (
                <div className="container m-5 mx-auto w-75">
                    <h2>Mis Eventos</h2>
                    {misEventos.length > 0 ? (
                        <ul className="list-group">
                            {misEventos.map(evento => (
                                <li key={evento.inscripcionId} className="list-group-item d-flex justify-content-between" style={{ borderColor: '#ffc107' }}>
                                    <div className="d-flex justify-content-between flex-grow-1">
                                        <img
                                            src={evento.imagen || "https://cdn-icons-png.freepik.com/512/3544/3544735.png"} // Asegúrate de que "evento.imagen" está disponible
                                            alt="Evento"
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
                                                <i className="fa-solid fa-location-dot" style={{ color: '#7c488f' }}></i> {evento.direccion}
                                            </li>
                                            <li>
                                                <Link to={`/evento/${evento.id}`} className="btn my-2" style={{ backgroundColor: '#7c488f',  color: 'white' }}>Saber más</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tienes eventos registrados.</p>
                    )}
                </div>
            )}
        </>
    );
};