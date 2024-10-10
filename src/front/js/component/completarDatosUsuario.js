// CompletarDatosUsuario.js
import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar esto
import { Mapa } from './mapa';


const CompletarDatosUsuario = () => {
    const { actions } = useContext(Context);
    const [step, setStep] = useState(1);
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [fecha_nacimiento, setFechaNacimiento] = useState("");
    // const [ubicacion, setUbicacion] = useState("");
    const [direccion, setDireccion] = useState("");
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);
    const [breve_descripcion, setDescripcion] = useState("");
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
        if (latitud === null || longitud === null) {
            alert("Por favor, selecciona una ubicación en el mapa.");
            return;
        }

        const result = await actions.completarDatos(userId, nombre, apellidos, fecha_nacimiento, direccion, latitud, longitud, breve_descripcion);

        if (result) {
            alert("Datos completados con éxito");
            navigate(`/profile/${userId}`);
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
                        <Mapa
                            setDireccion={(direccion, latitud, longitud) => {
                                setDireccion(direccion);
                                setLatitud(latitud); // Guardar latitud
                                setLongitud(longitud); // Guardar longitud
                            }}
                        />
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
                        <button type="submit">Completar Registro</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CompletarDatosUsuario;
