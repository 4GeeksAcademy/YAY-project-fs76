import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Intereses = () => {
    const { store, actions } = useContext(Context); 
    const [selectedInteres, setSelectedInteres] = useState(null);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [nuevoNombre, setNuevoNombre] = useState(""); 
    const [nuevaDescripcion, setNuevaDescripcion] = useState(""); 
    const [deleteMessage, setDeleteMessage] = useState(null); // Estado para el mensaje de confirmación

    useEffect(() => {
        actions.getInteres(); 
    }, []); 

    const handleEdit = async (id) => {
        const interes = await actions.getInteresById(id);
        setSelectedInteres(interes);
        setNombre(interes.nombre);
        setDescripcion(interes.descripcion);
    };

    const handleDelete = async (id) => {
        await actions.deleteInteres(id);
        setDeleteMessage("Interés eliminado exitosamente."); // Mensaje de confirmación
    };

    const handleSave = async () => {
        await actions.editInteres(selectedInteres.id, { nombre, descripcion });
        setSelectedInteres(null);
        setNombre("");
        setDescripcion("");
        actions.getInteres();
    };

    const handleCreate = async () => {
        await actions.createInteres({ nombre: nuevoNombre, descripcion: nuevaDescripcion });
        setNuevoNombre(""); 
        setNuevaDescripcion(""); 
        actions.getInteres();
    };

    const handleSelectInteres = (interes) => {
        setSelectedInteres(interes);
    };

    return (
        <div className="text-center mt-5">
            <h1>Intereses</h1>

            {/* Mostrar mensaje de confirmación al borrar un interés */}
            {deleteMessage && (
                <div className="alert alert-success">
                    {deleteMessage}
                    <button 
                        className="btn btn-primary" 
                        onClick={() => {
                            setDeleteMessage(null);
                            setSelectedInteres(null); // Vuelve a la lista de intereses
                        }}
                    >
                        Aceptar
                    </button>
                </div>
            )}

            {!selectedInteres ? (
                store.intereses.length > 0 ? (
                    <ul>
                        {store.intereses.map((interes, index) => (
                            <li key={index}>
                                <button 
                                    className="btn btn-link" 
                                    onClick={() => handleSelectInteres(interes)}
                                >
                                    {interes.nombre}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Cargando intereses...</p>  
                )
            ) : (
                <div>
                    <h2>{selectedInteres.nombre}</h2>
                    <p>{selectedInteres.descripcion}</p>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => handleEdit(selectedInteres.id)}
                    >
                        Editar
                    </button>
                    <button 
                        className="btn btn-danger" 
                        onClick={() => handleDelete(selectedInteres.id)}
                    >
                        Borrar
                    </button>
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => setSelectedInteres(null)}
                    >
                        Volver a la lista
                    </button>
                </div>
            )}

            {selectedInteres && (
                <div>
                    <h2>Editar Interés</h2>
                    <input 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        placeholder="Nombre" 
                    />
                    <input 
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)} 
                        placeholder="Descripción" 
                    />
                    <button onClick={handleSave}>Guardar</button>
                    <button onClick={() => setSelectedInteres(null)}>Cancelar</button>
                </div>
            )}

            <div>
                <h2>Crear Nuevo Interés</h2>
                <input 
                    value={nuevoNombre} 
                    onChange={(e) => setNuevoNombre(e.target.value)} 
                    placeholder="Nombre del nuevo interés" 
                />
                <input 
                    value={nuevaDescripcion} 
                    onChange={(e) => setNuevaDescripcion(e.target.value)} 
                    placeholder="Descripción del nuevo interés" 
                />
                <button className="btn btn-primary" onClick={handleCreate}>Crear</button>
            </div>

            <Link to="/">
                <button className="btn btn-primary mt-5">Back home</button>
            </Link>
        </div>
    );
};
