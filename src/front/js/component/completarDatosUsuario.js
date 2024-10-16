import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import { Mapa } from './mapa';
import { Autocomplete } from '@react-google-maps/api';

const styles = {

    container: {
        backgroundColor: 'white',
        color: 'black',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        minWidth: '500px',
        width: 'fit-content',
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    label: {
        maxWidth: '400px',
        margin: '10px 0 5px',
        fontSize: '20px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '5px',
        fontSize: '25px',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '20px',
        resize: 'none',
    },
    button: {
        backgroundColor: '#7c488f',
        color: 'white',
        padding: '5px 5px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginRight: '10px',
        height: 'fit-content'
    },
    buttonRemove: {
        backgroundColor: 'white',
        color: 'black',
        fontWeight: 'bold',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginRight: '10px',
        marginBottom: '10px',
    },
    interestButton: {
        color: 'black',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginRight: '10px',
        marginBottom: '10px',
    },

    selectedtButton: {
        backgroundColor: '#444',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginRight: '10px',
        marginBottom: '10px',
    },


    previousButton: {
        marginRight: 'auto',
    },
    nextButton: {
        marginLeft: 'auto',
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
    const [interesesSeleccionados, setInteresesSeleccionados] = useState(new Set());
    const [interesesDisponibles, setInteresesDisponibles] = useState([]);
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        let isMounted = true;

        const fetchIntereses = async () => {
            try {
                const data = await actions.getInteres();
                if (isMounted) {
                    setInteresesDisponibles(data);
                }
            } catch (error) {
                console.error("Error al cargar los intereses:", error);
            }
        };

        fetchIntereses();

        return () => {
            isMounted = false; // Limpiar cuando el componente se desmonta
        };
    }, [actions]);

    const handleNextStep = () => {
        let newErrors = {};
        const currentDate = new Date();
        const birthDate = new Date(fecha_nacimiento);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDifference = currentDate.getMonth() - birthDate.getMonth();

        if (step === 1 && !nombre) {
            newErrors.nombre = "*Por favor, rellene este campo.";
        }
        if (step === 2 && (latitud === null || longitud === null)) {
            newErrors.ubicacion = "*Por favor, selecciona una ubicación en el mapa.";
        }
        if (step === 3 && !fecha_nacimiento || step === 3 && age < 60) {
            newErrors.fecha = "*Debe ser mayor de 60 años para registrarse";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            setStep(step + 1);
        }
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir envío de formulario
        if (latitud === null || longitud === null) {
            return; // Manejo de errores
        }

        const result = await actions.completarDatos(
            localStorage.getItem('user_id'),
            nombre,
            apellidos,
            fecha_nacimiento,
            direccion,
            latitud,
            longitud,
            breve_descripcion
        );
        if (result) {
            // Guardar los intereses seleccionados
            await actions.agregarInteres(Array.from(interesesSeleccionados)); // Asegúrate de que se envían correctamente
            console.log(Array.from(interesesSeleccionados));
            navigate('/redirect-login');
        } else {
            console.error("Error al completar los datos");
        }
    };


    const handleInteresesChange = (interesId) => {
        setInteresesSeleccionados(prev => {
            const newSet = new Set(prev);
            if (newSet.has(interesId)) {
                newSet.delete(interesId); // Si ya está, quita
                setInteresesDisponibles(prev => [...prev, { id: interesId }]); // Agrega nuevamente a disponibles
            } else {
                newSet.add(interesId); // Si no está, añade
                setInteresesDisponibles(prev => prev.filter(i => i.id !== interesId)); // Quita de los disponibles
            }
            return newSet; // Devuelve el nuevo Set
        });
    };

    return (
        <div style={styles.container}>
            <h2 className='display-3 mb-4' style={styles.heading}>Completa tu Perfil</h2>
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div>
                        <label style={styles.label}>*Nombre</label>

                        <input
                            type="text"
                            style={{ ...styles.input, border: errors.nombre ? '1px solid red' : '1px solid #ccc' }}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Introduzca su nombre..."
                            required
                        />
                        {errors.nombre && <span className='text-danger float-end mb-0'>{errors.nombre}</span>}

                        <label className='mt-5' style={styles.label}>*Apellidos</label>
                        <input
                            type="text"
                            style={{ ...styles.input, border: errors.nombre ? '1px solid red' : '1px solid #ccc' }}
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                            placeholder="Introduzca sus apellidos..."
                            required
                        />
                        {errors.nombre && <span className='text-danger float-end mb-4'>{errors.nombre}</span>}
                        <div className="d-flex justify-content-end w-100 mt-3 px-5">
                            <button className="custom-button btn btn-lg pt-3"
                                style={{ borderColor: '#7c488f', backgroundColor: '#7c488f26', borderWidth: '2px', color: '#494949', fontWeight: '500' }}
                                onClick={handleNextStep}
                            >
                                <h5>Siguiente <i className="fa-solid fa-chevron-right small ms-1"></i></h5></button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        {errors.ubicacion && <span className='text-danger float-end mb-1'>{errors.ubicacion}</span>}
                        <label className='ms-1' style={{ minWidth: '800px' }}> *Dirección</label>
                        <Mapa
                            setDireccion={(direccion, latitud, longitud) => {
                                setDireccion(direccion);
                                setLatitud(latitud);
                                setLongitud(longitud);
                            }}
                        />
                        <div className="d-flex justify-content-between w-100 mt-3 px-5">
                            <button className="custom-button btn btn-lg pt-3"
                                style={{ borderColor: '#7c488f', backgroundColor: '#7c488f26', borderWidth: '2px', color: '#494949', fontWeight: '500' }}
                                onClick={handlePreviousStep}
                            >
                                <h5><i className="fa-solid fa-chevron-left small ms-1"></i> Anterior</h5></button>
                            <button className="custom-button btn btn-lg pt-3"
                                style={{ borderColor: '#7c488f', backgroundColor: '#7c488f26', borderWidth: '2px', color: '#494949', fontWeight: '500' }}
                                onClick={handleNextStep}
                            >
                                <h5>Siguiente <i className="fa-solid fa-chevron-right small ms-1"></i></h5></button>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <label style={styles.label}>*Fecha de Nacimiento</label>
                        <input
                            type="date"
                            style={{ ...styles.input, border: errors.nombre ? '1px solid red' : '1px solid #ccc' }}
                            value={fecha_nacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                            placeholder="Introduzca su fecha de nacimiento..."
                            required
                        />
                        {errors.fecha && <span className='text-danger float-end mb-0'>{errors.fecha}</span>}
                        <label style={styles.label}>Algo sobre ti (opcional)</label>
                        <textarea
                            style={{ ...styles.textarea, height: '100px' }}
                            value={breve_descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Breve descripción, una frase de una canción, una cita de una película..."

                        />
                        <div className="d-flex justify-content-between mt-3 px-5 w-100 ">
                            <button className="custom-button btn btn-lg pt-3"
                                style={{ borderColor: '#7c488f', backgroundColor: '#7c488f26', borderWidth: '2px', color: '#494949', fontWeight: '500' }}
                                onClick={handlePreviousStep}
                            >
                                <h5><i className="fa-solid fa-chevron-left small ms-1"></i> Anterior</h5></button>
                            <button className="custom-button btn btn-lg pt-3"
                                style={{ borderColor: '#7c488f', backgroundColor: '#7c488f26', borderWidth: '2px', color: '#494949', fontWeight: '500' }}
                                onClick={handleNextStep}
                            ><h5>Siguiente <i className="fa-solid fa-chevron-right small ms-1"></i></h5></button>
                        </div>
                    </div>
                )}
                {step === 4 && (
                    <div>
                        <label style={styles.label}>Selecciona algunos de tus intereses</label>
                        <div>
                            {interesesDisponibles.map(interes => (
                                <button
                                    key={interes.id}
                                    type="button"
                                    style={interesesSeleccionados.has(interes.id) ? styles.buttonRemove : styles.interestButton}
                                    onClick={() => handleInteresesChange(interes.id)}
                                >
                                    {interes.nombre}
                                </button>
                            ))}
                        </div>
                        <br />
                        <label className='mt-5' style={styles.label}>Tus intereses seleccionados</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {Array.from(interesesSeleccionados).map(interesId => {
                                const interes = interesesDisponibles.find(i => i.id === interesId);
                                return (
                                    <div key={interesId} style={{ marginRight: '10px', textAlign: 'center' }}>
                                        <span style={styles.selectedtButton}>{interes?.nombre}</span>
                                        <div>
                                            <button
                                                type="button"
                                                className='bg-transparent'
                                                style={{ ...styles.buttonRemove, fontSize: '12px' }}
                                                onClick={() => handleInteresesChange(interesId)}
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {errors.fecha && <span className='text-danger float-end mb-0'>*Pulsa de nuevo para quitar interés</span>}
                        <div className="d-flex justify-content-between mt-3 px-5 w-100 ">
                            <button className="btn btn-lg custom-button  pt-3 my-5"
                                style={{ borderColor: '#7c488f', backgroundColor: '#7c488f26', borderWidth: '2px', color: '#494949', fontWeight: '500' }}
                                onClick={handlePreviousStep}
                            >
                                <h5><i className="fa-solid fa-chevron-left small ms-1"></i> Anterior</h5></button>
                            <button type="submit" className="btn btn-lg my-5" style={{ backgroundColor: '#7c488f', color: 'white', fontWeight: '500' }}>Completar Registro</button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CompletarDatosUsuario;
