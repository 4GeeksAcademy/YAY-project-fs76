import React, { useState, useContext, useEffect } from "react";
import { Context } from '../store/appContext';

export const Inscripciones = ({ usuarioId, eventoId, inscripcionId, setInscripcionId }) => {
    const { actions } = useContext(Context);
    const [isInscrito, setIsInscrito] = useState(false);

    useEffect(() => {
        if (inscripcionId) {
            setIsInscrito(true);
        } else {
            setIsInscrito(false); 
        }
    }, [inscripcionId]);

    const handleInscribirse = async () => {
        const id = await actions.inscribirse(usuarioId, eventoId);
        if (id) {
            console.log('ID de inscripción:', id);
            setInscripcionId(id);
            setIsInscrito(true);
        } else {
            console.error('No se pudo obtener el ID de inscripción');
        }
    };

    const handleDesapuntarse = async () => {
        if (!inscripcionId) {
            console.error('No se ha proporcionado un ID de inscripción válido');
            return;
        }

        const result = await actions.desapuntarse(inscripcionId);
        if (result) {
            console.log('Inscripción eliminada con éxito');
            setInscripcionId(null);
            setIsInscrito(false);
        } else {
            console.log('Error al eliminar la inscripción');
        }
    };

    return (
        <div>
            <button 
                className={`btn ${isInscrito ? 'btn-danger' : 'btn-success'} mt-5`} 
                onClick={isInscrito ? handleDesapuntarse : handleInscribirse}
            >
                {isInscrito ? 'Me desapunto' : 'Me apunto'}
            </button>
        </div>
    ); 
};