import React, { useState, useContext, useEffect } from "react";
import { Context } from '../store/appContext';

export const Inscripciones = ({ usuarioId, eventoId, inscripcionId, setInscripcionId, nombreEvento }) => {
    const { store, actions } = useContext(Context);
    const [isInscrito, setIsInscrito] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [inscripcionIds, setInscripcionIds] = useState({});

    useEffect(() => {
        const obtenerInscripcion = async () => {
            const inscripcion = await actions.getInscripcionUsuarioEventoInscrito(usuarioId, eventoId);
            console.log(inscripcion); 
            if (inscripcion && inscripcion.inscrito) {
                setIsInscrito(true);
                setInscripcionId(inscripcion.id); 
            } else {
                setIsInscrito(false);
                setInscripcionId(null); 
            }
        };
        obtenerInscripcion();
    }, [usuarioId, eventoId, actions.getInscripcionUsuarioEventoInscrito]);


    const setInscripcionIdForEvento = (eventoId, id, userId) => {
        setInscripcionIds(prev => ({ ...prev, [eventoId]: id, [userId]: id }));
        console.log('Inscripcion IDs:', inscripcionIds);
    };

    const handleInscribirse = async () => {
        const id = await actions.inscribirse(usuarioId, eventoId);
        if (id) {
            setIsInscrito(true);
            setInscripcionId(id); 
        } else {
            console.error('No se pudo obtener el ID de inscripción');
        }
    };

    const handleDesapuntarse = async () => {
        setShowModal(true);
    };

    const confirmDesapuntarse = async () => {
        if (!inscripcionId) {
            console.error('No se ha proporcionado un ID de inscripción válido');
            return;
        }

        const result = await actions.desapuntarse(inscripcionId);
        if (result) {
            setIsInscrito(false);
            setInscripcionId(null); 
        } else {
            console.log('Error al eliminar la inscripción');
        }
        setShowModal(false);
    };

    return (
        <div>
            <button
                key={eventoId}
                className="btn text-black btn-lg"
                style={{ color: '#494949', backgroundColor: isInscrito ? '#de8f79' : '#A7D0CD' }}
                onClick={isInscrito ? handleDesapuntarse : handleInscribirse}
            >
                {isInscrito ? 'Me desapunto' : 'Me apunto'}
            </button>

            {showModal && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Solicitud para cancelar plaza en el evento</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body d-flex align-items-start">
                                <i className="fa-solid fa-circle-exclamation fa-4x mx-2" style={{ color: '#7c488f' }}></i>
                                <div className="mx-3">
                                    <h4 className="mb-0" style={{ color: '#7c488f' }}>{nombreEvento}</h4>
                                    <hr className="mt-0 mb-1" />
                                    <p>¿Estás seguro/a de que quieres desapuntarte de este evento? Si confirmas, tu plaza quedará libre y otra persona podrá ocuparla.</p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar solicitud</button>
                                <button type="button" className="btn text-white" style={{ backgroundColor: "#de8f79" }} onClick={confirmDesapuntarse}>Sí, quiero desapuntarme</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};