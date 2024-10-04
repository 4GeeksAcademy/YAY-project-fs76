// CompletarDatosUsuario.js
import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Importa useParams
import { Context } from "../store/appContext";

const CompletarDatosUsuario = () => { 
    const { userId } = useParams(); // Obtén userId de los parámetros de la URL
    const { actions } = useContext(Context);
    const [step, setStep] = useState(1);
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [fecha_nacimiento, setFechaNacimiento] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [breve_descripcion, setDescripcion] = useState("");
    const navigate = useNavigate();

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Llamada a la función de completar datos
        const result = await actions.completarDatos(userId, nombre, apellidos, fecha_nacimiento, ubicacion, breve_descripcion);
        
        if (result) {
            alert("Datos completados con éxito");
            navigate("/dashboard");
        } else {
            alert("Error al completar los datos");
        }
    };

    return (
        <div className="completar-datos-container">
            <h2>Completa tu Perfil</h2>
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div>
                        <label>Nombre (requerido):</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                        <label>Apellidos (opcional):</label>
                        <input
                            type="text"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                        />
                        <button type="button" onClick={handleNextStep}>Siguiente</button>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <label>Fecha de Nacimiento (opcional):</label>
                        <input
                            type="date"
                            value={fecha_nacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                        />
                        <label>Ubicación (opcional):</label>
                        <input
                            type="text"
                            value={ubicacion}
                            onChange={(e) => setUbicacion(e.target.value)}
                        />
                        <button type="button" onClick={handlePreviousStep}>Anterior</button>
                        <button type="button" onClick={handleNextStep}>Siguiente</button>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <label>Descripción (opcional):</label>
                        <textarea
                            value={breve_descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                        <button type="button" onClick={handlePreviousStep}>Anterior</button>
                        <button type="submit">Completar Registro</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CompletarDatosUsuario;
