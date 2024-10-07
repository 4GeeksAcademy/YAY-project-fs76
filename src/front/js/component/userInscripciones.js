import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom"; 

const UserInscripciones = () => {
    const { actions } = useContext(Context);
    const { userId } = useParams(); 
    const [inscripciones, setInscripciones] = useState([]);

    useEffect(() => {

        const fetchInscripciones = async () => {
    
            try {
    
                const response = await actions.getUserInscripciones(userId);
    
                if (!response.ok) {
    
                    throw new Error('Error fetching user inscripciones');
    
                }
    
                const result = await response.json();
    
                if (result) {
    
                    setInscripciones(result.inscripciones);
    
                } else {
    
                    console.error("No se pudieron obtener las inscripciones");
    
                }
            } catch (error) {
                console.error('Error fetching user inscripciones:', error);
            }
        };
        fetchInscripciones();
    
    }, [userId, actions]);

    return (
        <div>
        <h2>Tus Inscripciones</h2>
        {inscripciones.length > 0 ? (
            <ul>
                {inscripciones.map((inscripcion) => (
                    <li key={inscripcion.id}>
                        Evento: {inscripcion.evento_nombre} <br />
                        Fecha: {inscripcion.fecha_registro}
                    </li>
                ))}
            </ul>
        ) : (
            <p>No tienes inscripciones.</p>
        )}
    </div>
);
};

export default UserInscripciones;
