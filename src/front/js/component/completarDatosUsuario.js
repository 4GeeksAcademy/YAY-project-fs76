import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import { Mapa } from './mapa';

const styles = {
    container: {
        backgroundColor: 'white',
        color: 'black',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        margin: '10px 0 5px',
        fontSize: '18px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '20px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '20px',
        resize: 'none',
    },
    button: {
        backgroundColor: '#A7D0CD', // Azul
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginRight: '10px',
    },
    buttonRemove: {
        backgroundColor: '#de8f79', // Naranja
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginRight: '10px',
    },
    interestButton: {
        backgroundColor: '#7c488f', // Morado
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginRight: '10px',
        marginBottom: '10px',
    },
};

const CompletarDatosUsuario = () => {
    const { actions } = useContext(Context);
    const [step, setStep] = useState(1);
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [fecha_nacimiento, setFechaNacimiento] = useState("");
    const [direccion, setDireccion] = useState("");
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);
    const [breve_descripcion, setDescripcion] = useState("");
    const [misIntereses, setMisIntereses] = useState([]);
    const [interesesSeleccionados, setInteresesSeleccionados] = useState({});
    const navigate = useNavigate();
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
            // alert("Por favor, selecciona una ubicación en el mapa.");
            return;
        }

        const result = await actions.completarDatos(userId, nombre, apellidos, fecha_nacimiento, direccion, latitud, longitud, breve_descripcion);

        if (result) {
            await actions.updateProfile(userId, nombre, apellidos, fecha_nacimiento, direccion, breve_descripcion, misIntereses);
            localStorage.setItem('selectedInterests', JSON.stringify(misIntereses));
            // alert("Datos completados con éxito");
            navigate(`/profile/${userId}`);
        } else {
            // alert("Error al completar los datos");
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
        <div style={styles.container}>
            <h2 style={styles.heading}>Completa tu Perfil</h2>
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div>
                        <label style={styles.label}>Nombre (requerido):</label>
                        <input
                            type="text"
                            style={styles.input}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                        <label style={styles.label}>Apellidos (opcional):</label>
                        <input
                            type="text"
                            style={styles.input}
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                        />
                        <button type="button" style={styles.button} onClick={handleNextStep}>Siguiente</button>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <Mapa
                            setDireccion={(direccion, latitud, longitud) => {
                                setDireccion(direccion);
                                setLatitud(latitud);
                                setLongitud(longitud);
                            }}
                        />
                        <button type="button" style={styles.buttonRemove} onClick={handlePreviousStep}>Anterior</button>
                        <button type="button" style={styles.button} onClick={handleNextStep}>Siguiente</button>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <label style={styles.label}>Fecha de Nacimiento (opcional):</label>
                        <input
                            type="date"
                            style={styles.input}
                            value={fecha_nacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                        />
                        <label style={styles.label}>Descripción (opcional):</label>
                        <textarea
                            style={{ ...styles.textarea, height: '100px' }}
                            value={breve_descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                        <button type="button" style={styles.buttonRemove} onClick={handlePreviousStep}>Anterior</button>
                        <button type="button" style={styles.button} onClick={handleNextStep}>Siguiente</button>
                    </div>
                )}
                {step === 4 && (
                    <div>
                        <label style={styles.label}>Mis Intereses (selecciona al menos 3):</label>
                        <div>
                            {["Deporte", "Música", "Cine", "Literatura", "Viajes"].map(interes => (
                                <button
                                    key={interes}
                                    type="button"
                                    style={styles.interestButton}
                                    onClick={() => handleInteresesChange(interes)}
                                >
                                    {interesesSeleccionados[interes] ? "Quitar" : ""} {interes}
                                </button>
                            ))}
                        </div>
                        {misIntereses.length < 3 && (
                            <p>Por favor, selecciona al menos 3 intereses.</p>
                        )}
                        <button type="button" style={styles.buttonRemove} onClick={handlePreviousStep}>Anterior</button>
                        <button type="submit" style={styles.button}>Completar Registro</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CompletarDatosUsuario;
