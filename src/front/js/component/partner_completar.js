import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Navigate } from "react-router-dom";
import { Mapa } from "./mapa";

export const Partner_Completar = () => {
    const { store, actions } = useContext(Context);
    const [nuevoPartner, setNuevoPartner] = useState({
        nombre: '',
        nif: '',
        direccion: '',
        latitud: '',
        longitud: '',
        sector: '',
        entidad_id: ''
    });
    const [alert, setAlert] = useState(null);
    const [showModal, setShowModal] = useState(false); // Estado para el modal
    const navigate = useNavigate();
    const { theid } = useParams();

    useEffect(() => {
        actions.getEntidades();
    }, [actions]);

    const handleUpdate = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            setAlert({ type: 'danger', message: 'Se requiere iniciar sesión nuevamente.' });
            actions.logout(); // Cierra la sesión si no hay token
            return;
        }

        actions.updatePartnerProfile(theid, nuevoPartner,
            () => {
                // onSuccess
                setShowModal(true); 
                setTimeout(() => {
                    setShowModal(false);
                    navigate('/redirect-partner'); 
                }, 5000);
                setAlert({ type: 'success', message: 'Perfil actualizado exitosamente' });
            },
            (error) => {
                // onError
                setAlert({ type: 'danger', message: 'Error al actualizar el perfil' });
            }
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { nombre, nif, direccion, latitud, longitud, sector, entidad_id } = nuevoPartner;

        // Verificar si todos los campos están completos
        if (!nombre || !nif || !direccion || latitud === null || longitud === null || !sector || !entidad_id) {
            setAlert({ type: 'danger', message: 'Por favor, complete todos los campos' });
        } else {
            handleUpdate(); // Llama a handleUpdate si los campos son válidos
        }
    };

    const setDireccion = (direccion, latitud, longitud) => {
        setNuevoPartner({ ...nuevoPartner, direccion, latitud, longitud });
    };

    return (
        <>
            {store.auth === true ? <Navigate to="/redirect-partner" /> :
                <>
                {showModal && (
                    <div className="modal fade show" style={{ display: 'block', position: 'fixed', zIndex: 1050, left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header" style={{ backgroundColor: '#7c488f', color: 'white' }}>
                                    <h5 className="modal-title">Éxito</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p>Tu perfil ha sido actualizado exitosamente. En unos segundos, serás redirigido/a para que puedas iniciar sesión.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                    <form onSubmit={handleSubmit} className="container m-5 mx-auto w-50" style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <h1 className="text-center">Completar tu perfil de Partner</h1>
                        {alert && (
                            <div className={`alert fade show alert-${alert.type}`} role="alert">
                                {alert.type === 'danger' ? <i className="fa-solid fa-triangle-exclamation"></i> : <i className="fa-solid fa-circle-check"></i>}
                                {alert.message}
                                <i type="button" className="btn-close float-end" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></i>
                            </div>
                        )}

                        <div className="mb-3">
                            <label htmlFor="nombreInput" className="form-label">Nombre</label>
                            <input type="text"
                                value={nuevoPartner.nombre}
                                onChange={(e) => setNuevoPartner({ ...nuevoPartner, nombre: e.target.value })}
                                className="form-control"
                                id="nombreInput"
                                placeholder="Introduzca nombre..." />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="nifInput" className="form-label">NIF o DNI</label>
                            <input type="text"
                                value={nuevoPartner.nif}
                                onChange={(e) => setNuevoPartner({ ...nuevoPartner, nif: e.target.value })}
                                className="form-control"
                                id="nifInput"
                                placeholder="Introduzca NIF o DNI..." />
                        </div>

                        <div className="mb-3">
                            <Mapa setDireccion={setDireccion} initialDireccion={nuevoPartner.direccion} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="sectorInput" className="form-label">Sector</label>
                            <input type="text"
                                value={nuevoPartner.sector}
                                onChange={(e) => setNuevoPartner({ ...nuevoPartner, sector: e.target.value })}
                                className="form-control"
                                id="sectorInput"
                                placeholder="Introduzca sector..." />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="entidad_idInput" className="form-label">Tipo de entidad</label>
                            <select value={nuevoPartner.entidad_id}
                                onChange={(e) => setNuevoPartner({ ...nuevoPartner, entidad_id: e.target.value })}
                                className="form-control"
                                id="entidad_idInput">
                                <option value="">Seleccione una entidad</option>
                                {store.entidades.map((entidad) => (
                                    <option key={entidad.id} value={entidad.id}>
                                        {entidad.tipo}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="d-grid gap-2">
                            <button type="submit" className="btn w-100" style={{ backgroundColor: '#7c488f', color: 'white' }} onFocus={(e) => e.target.blur()}>Guardar</button>
                        </div>
                    </form>
                </>
            }
        </>
    );
};