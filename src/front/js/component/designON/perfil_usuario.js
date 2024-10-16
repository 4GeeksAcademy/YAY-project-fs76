import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MisEventos } from "./misEventos";
import GetUserPerfilImage from "../getUserPerfilImage";
import GetUserImages from "../getUserImagens";
import "../../../styles/profile.css";

const styles = {
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

    buttonSaveStyle: {
        backgroundColor: '#7c488f',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    profileHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    profileImageContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    profileImage: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '10px',
    },
};

export const Perfil_Usuario = () => {
    const { store, actions } = useContext(Context);
    const { userId } = useParams();
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        nombre: '',
        apellidos: '',
        fecha_nacimiento: '',
        direccion: '',
        breve_descripcion: '',
        telefono: '',
        genero: 'otro',
        email: '',
    });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [interesesSeleccionados, setInteresesSeleccionados] = useState(new Set());
    const [misIntereses, setMisIntereses] = useState([]); // Lista de intereses seleccionados
    const [interesesDisponibles, setInteresesDisponibles] = useState([]);
    const [activeSection, setActiveSection] = useState("informacionPersonal");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleInterestSelect = (selectedInterests) => {
        setProfile((prevProfile) => ({ ...prevProfile, selectedInterests }));
        localStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));
    };

    useEffect(() => {
        const idToUse = userId || localStorage.getItem("userId") || store.user_id;
        if (idToUse) {
            actions.getProfile(idToUse)
                .then((data) => {
                    if (data) {
                        setProfile(data);
                        setMisIntereses(Array.isArray(data.intereses) ? data.intereses.map(i => i.id) : []); // Ajustes para asegurarte de que traes solo IDs
                    }
                })
                .catch(error => console.error("Error al obtener el perfil:", error));

            // Obtener todos los intereses
            actions.obtenerIntereses()
                .then(data => {
                    setInteresesDisponibles(Array.isArray(data) ? data : []); // Asegúrate de que sea un array
                });

            actions.loadEventosConUsuarios()
                .then(() => setLoading(false), actions.loadInscripciones())
                .catch(err => {
                    setLoading(false);
                    setError("Error al cargar eventos");
                });

        }


    }, [userId, store.user_id, actions.loadEventosConUsuarios]);

    const handleInteresChange = (interesId) => {
        setMisIntereses(prev => {
            if (prev.includes(interesId)) {
                return prev.filter(id => id !== interesId);
            } else {
                return [...prev, interesId];
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const profileConIntereses = {
            ...profile,
            intereses: misIntereses
        };

        actions.completarDatos(
            userId,
            profileConIntereses.nombre,
            profileConIntereses.apellidos,
            profileConIntereses.fecha_nacimiento,
            profileConIntereses.direccion,
            profileConIntereses.breve_descripcion,
            profileConIntereses.telefono,
            profileConIntereses.genero,
            profileConIntereses.intereses
        )
            .then(() => {
                setAlertMessage("¡Cambios guardados exitosamente!");
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
            })
            .catch((error) => {
                console.error("Error al actualizar el perfil:", error);
                setAlertMessage("Hubo un error al guardar los cambios.");
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
            });
    };

    const handleSubmitIntereses = async () => {
        // Guardar intereses seleccionados
        await Promise.all(misIntereses.map(interesId => actions.agregarInteres(profile.id, interesId)));
        setAlertMessage("¡Intereses guardados exitosamente!");
        setShowAlert(true);

        setTimeout(() => setShowAlert(false), 5000);
    };


    const confirmDeleteAccount = () => {
        actions.deleteAccount(userId)
            .then(() => {
                navigate('/logout');  // Redirigir al usuario a la página de logout
            })
            .catch((error) => {
                console.error("Error al eliminar la cuenta:", error);
            });
    };

    const handleCancel = () => {
        setActiveSection("informacionPersonal");
    };

    // Estado para la sección de Seguridad
    const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

    // Estado para las notificaciones
    const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Valor inicial

    // Función para alternar la autenticación de 2 factores
    const toggleTwoFactor = async () => {
        try {
            await actions.toggleTwoFactorAuth(userId); // Debes implementar esta función en tu contexto
            setIsTwoFactorEnabled(prev => !prev);
        } catch (error) {
            console.error("Error al cambiar la autenticación de dos factores:", error);
        }
    };

    // Función para alternar las notificaciones
    const toggleNotifications = () => {
        setNotificationsEnabled(prev => !prev);
    };


    const handleInteresesChange = (interesId) => {
        setInteresesSeleccionados(prev => {
            const newSet = new Set(prev);
            if (newSet.has(interesId)) {
                newSet.delete(interesId);
                setInteresesDisponibles(prev => [...prev, { id: interesId }]);
            } else {
                newSet.add(interesId); // Si no está, añade
                setInteresesDisponibles(prev => prev.filter(i => i.id !== interesId));
            }
            return newSet; // Devuelve el nuevo Set
        });
    };

    return (
        <>
            <main className="profile-container">
                {showAlert && (
                    <div className={`alert alert-success alert-dismissible fade show`} role="alert">
                        <i className="fas fa-check me-2"></i>
                        {alertMessage}
                        <button type="button" className="btn-close" onClick={() => setShowAlert(false)} aria-label="Close"></button>
                    </div>
                )}
                <header className="profile-header text-center">
                    <h1 className="text-white">Mi Perfil</h1>
                </header>

                <div className="profile-content container">
                    <aside className="profile-sidebar">
                        <div className="profile-card">
                            <GetUserPerfilImage />
                            <h3 className="profile-name">{profile.nombre}</h3>
                            <p className="profile-email">{profile.email}</p>
                            <nav className="profile-nav">
                                <button className="nav-link" onClick={() => setActiveSection("informacionPersonal")}>Información personal</button>
                                <button className="nav-link active" onClick={() => setActiveSection("misIntereses")}>Mis Intereses</button>
                                <button className="nav-link" onClick={() => setActiveSection("misEventos")}>Mis Eventos</button>
                                <button className="nav-link" onClick={() => setActiveSection("misFotos")}>Mis Fotos</button>
                                <button className="nav-link" onClick={() => setActiveSection("seguridad")}>Seguridad</button>
                                <button className="nav-link" onClick={() => setActiveSection("notificaciones")}>Notificaciones</button>
                            </nav>
                        </div>
                    </aside>

                    <section className="profile-details">
                        {activeSection === 'informacionPersonal' && (
                            <>
                                <div className="profile-card">
                                    <h2 className="profile-card-header text-black">Información personal</h2>
                                    <form onSubmit={handleSubmit}>

                                        {/* Estructura de filas para nombre y apellidos, fecha de nacimiento y teléfono */}
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Nombre</label>
                                                    <input
                                                        type="text"
                                                        name="nombre"
                                                        value={profile.nombre}
                                                        onChange={(e) => setProfile({ ...profile, nombre: e.target.value })}
                                                        className="form-control"
                                                        required
                                                        style={{ fontSize: "1.1rem" }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Apellidos</label>

                                                    <input
                                                        type="text"
                                                        name="apellidos"
                                                        value={profile.apellidos}
                                                        onChange={(e) => setProfile({ ...profile, apellidos: e.target.value })}
                                                        className="form-control"
                                                        required
                                                        style={{ fontSize: "1.1rem" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Fecha de nacimiento</label>
                                                    <input
                                                        type="date"
                                                        name="fecha_nacimiento"
                                                        value={profile.fecha_nacimiento}
                                                        onChange={(e) => setProfile({ ...profile, fecha_nacimiento: e.target.value })}
                                                        className="form-control"
                                                        style={{ fontSize: "1.1rem" }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Teléfono</label>
                                                    <input
                                                        type="tel"
                                                        name="telefono"
                                                        value={profile.telefono}
                                                        onChange={(e) => setProfile({ ...profile, telefono: e.target.value })}
                                                        className="form-control"
                                                        style={{ fontSize: "1.1rem" }}
                                                        placeholder="Número de teléfono"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label>Género</label>
                                                <div className="gender-options">
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            className="me-1"
                                                            value="masculino"
                                                            checked={profile.genero === 'masculino'}
                                                            onChange={(e) => setProfile({ ...profile, genero: e.target.value })}
                                                        />
                                                        Masculino
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            className="me-1"
                                                            value="femenino"
                                                            checked={profile.genero === 'femenino'}
                                                            onChange={(e) => setProfile({ ...profile, genero: e.target.value })}
                                                        />
                                                        Femenino
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            className="me-1"
                                                            value="otro"
                                                            checked={profile.genero === 'otro'}
                                                            onChange={(e) => setProfile({ ...profile, genero: e.target.value })}
                                                        />
                                                        Otro
                                                    </label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Breve Descripción (pública)</label>
                                            <textarea
                                                name="breve_descripcion"
                                                value={profile.breve_descripcion}
                                                onChange={(e) => setProfile({ ...profile, breve_descripcion: e.target.value })}
                                                className="form-control"
                                                rows="3"
                                                style={{ fontSize: "1.1rem" }}
                                            />
                                        </div>

                                        <div className="form-actions d-flex justify-content-end">
                                            <button type="button" className="btn btn-secondary me-2">Cancelar</button>
                                            <button type="submit" style={styles.buttonSaveStyle}>Guardar cambios</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="profile-card delete-account">
                                    <h4 className="profile-card-header">Eliminar tu Cuenta</h4>
                                    <p>Cuando elimine su cuenta, perderá el acceso a los servicios de la cuenta y borraremos permanentemente sus datos personales. Puedes cancelar la eliminación durante 14 días.</p>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="deleteAccountCheckbox" />
                                        <label className="form-check-label" htmlFor="deleteAccountCheckbox" required>Confirmo que deseo eliminar mi cuenta en Yay</label>
                                    </div>
                                    <div className="form-actions text-end">
                                        <button type="submit" className="btn btn-danger" onClick={() => setShowDeleteConfirm(true)}>Eliminar</button>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeSection === 'misIntereses' && (
                            <div className="profile-card">
                                <h2 className="profile-card-header text-black">Mis Intereses</h2>
                                <label>Tus intereses</label>
                                <div>
                                    {interesesDisponibles.length > 0 ? (
                                        interesesDisponibles.map(interes => (
                                            <button
                                                key={interes.id}
                                                type="button"
                                                style={interesesSeleccionados.has(interes.id) ? styles.buttonRemove : styles.interestButton}
                                                onClick={() => handleInteresesChange(interes.id)}
                                            >
                                                {interes.nombre}
                                            </button>
                                        ))
                                    ) : (
                                        <span className='text-danger fs-6'><b>No hay intereses disponibles</b></span>
                                    )}
                                </div>


                                <div className="d-flex justify-content-end">
                                    <button type="button" onClick={handleSubmitIntereses} style={styles.buttonSaveStyle}>
                                        Guardar Intereses
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeSection === 'misEventos' && (
                            <MisEventos />
                        )}
                        {activeSection === 'misFotos' && (
                            <div>
                                <div className="profile-card">
                                    <h2 className="profile-card-header text-black">Mi foto de perfil</h2>
                                    <GetUserPerfilImage />
                                </div>
                                <div className="profile-card">
                                    <h2 className="profile-card-header text-black">Galería de Imágenes</h2>
                                    <GetUserImages />
                                </div>
                            </div>
                        )}
                        {activeSection === 'seguridad' && (
                            <div className="profile-card">
                                <h2 className={styles.sectionTitle}>Seguridad</h2>
                                <div className="form-group">
                                    <label>Autenticación de dos factores</label>
                                    <div>
                                        <button
                                            className={`btn mt-3 ${isTwoFactorEnabled ? 'text-danger' : 'btn-success'}`}
                                            onClick={toggleTwoFactor}
                                        >
                                            {isTwoFactorEnabled ? "Desactivar 2FA" : "Activar 2FA"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'notificaciones' && (
                            <div className="profile-card">
                                <h2 className={styles.sectionTitle}>Notificaciones</h2>
                                <div className="form-group mt-2">
                                    <label>Recibir notificaciones por correo</label>
                                    <div>
                                        <button
                                            className={`btn mt-3 ${notificationsEnabled ? 'text-danger' : 'btn-success'}`}
                                            onClick={toggleNotifications}
                                        >
                                            {notificationsEnabled ? "Desactivar Notificaciones" : "Activar Notificaciones"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                </div>
            </main>
        </>
    );
};