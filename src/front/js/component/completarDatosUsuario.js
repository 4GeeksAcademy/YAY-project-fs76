import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar esto
import { MapaUsuario } from './mapaUsuario';

const CompletarDatosUsuario = () => {
    const { actions } = useContext(Context);
    const [step, setStep] = useState(1);
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [fecha_nacimiento, setFechaNacimiento] = useState("");
    // const [ubicacion, setUbicacion] = useState("");
    const [direccion, setDireccion] = useState("");
    const [breve_descripcion, setDescripcion] = useState("");
    const [misIntereses, setMisIntereses] = useState([]); // New state for mis intereses
    const [interesesSeleccionados, setInteresesSeleccionados] = useState({}); // New state to store selected interests
    const navigate = useNavigate();

    // Obtén el userId del sessionStorage
    const userId = sessionStorage.getItem('userId');

    const handleNextStep = () => {
        setStep(step + 1);
    };
    const handlePreviousStep = () => {
        setStep(step - 1);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.completarDatos(userId, nombre, apellidos, fecha_nacimiento, direccion, breve_descripcion, misIntereses)
        if (result) {
            await actions.updateProfile(userId, nombre, apellidos, fecha_nacimiento, direccion, breve_descripcion, misIntereses);
            localStorage.setItem('selectedInterests', JSON.stringify(misIntereses));
            alert("Datos completados con éxito");
            navigate(`/profile/${userId}`);
        } else {
            alert("Error al completar los datos");
        }
    };

    const handleInteresesChange = (interes) => {
        if (interesesSeleccionados[interes]) {
            setInteresesSeleccionados((prevIntereses) => ({ ...prevIntereses, [interes]: false }));
            setMisIntereses((prevIntereses) => prevIntereses.filter((i) => i !== interes));
        } else {
            setInteresesSeleccionados((prevIntereses) => ({ ...prevIntereses, [interes]: true }));
            setMisIntereses((prevIntereses) => [...prevIntereses, interes]);
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
                        <MapaUsuario setDireccion={setDireccion} />
                        {/* <label>Código Postal (opcional):</label>
                        <input
                            type="text"
                            value={ubicacion}
                            onChange={(e) => setUbicacion(e.target.value)}
                        /> */}
                        <button type="button" onClick={handlePreviousStep}>Anterior</button>
                        <button type="button" onClick={handleNextStep}>Siguiente</button>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <label>Fecha de Nacimiento (opcional):</label>
                        <input
                            type="date"
                            value={fecha_nacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                        />
                        <label>Descripción (opcional):</label>
                        <textarea
                            value={breve_descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                        <button type="button" onClick={handlePreviousStep}>Anterior</button>
                        <button type="button" onClick={handleNextStep}>Siguiente</button>
                    </div>
                )}
                {step === 4 && (
                    <div>
                        <label>Mis Intereses (selecciona al menos 3):</label>
                        <div>
                            <button type="button" onClick={() => handleInteresesChange("Deporte")}>
                                {interesesSeleccionados["Deporte"] ? "Quitar" : ""} Deporte
                            </button>
                            <button type="button" onClick={() => handleInteresesChange("Música")}>
                                {interesesSeleccionados["Música"] ? "Quitar" : ""} Música
                            </button>
                            <button type="button" onClick={() => handleInteresesChange("Cine")}>
                                {interesesSeleccionados["Cine"] ? "Quitar" : ""} Cine
                            </button>
                            <button type="button" onClick={() => handleInteresesChange("Literatura")}>
                                {interesesSeleccionados["Literatura"] ? "Quitar" : ""} Literatura
                            </button>
                            <button type="button" onClick={() => handleInteresesChange("Viajes")}>
                                {interesesSeleccionados["Viajes"] ? "Quitar" : ""} Viajes
                            </button>
                            
                        </div>
                        {misIntereses.length < 3 && (
                            <p>Por favor, selecciona al menos 3 intereses.</p>
                        )}
                        <button type="button" onClick={handlePreviousStep}>Anterior</button>
                        <button type="submit">Completar Registro</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CompletarDatosUsuario;