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

    useEffect(() => {
        actions.getInteres(); 
    }, []); 

    const handleEdit = async (id) => {
        const interes = await actions.getInteresById(id);
        setSelectedInteres(interes);
        setNombre(interes.nombre);
        setDescripcion(interes.descripcion);
    };

    const handleDelete = (id) => {
        actions.deleteInteres(id);
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

    return (
		<div className="text-center mt-5">
            <h1>Lista de Intereses</h1>
            {store.intereses.length > 0 ? (
                <ul>
                    {store.intereses.map((interes, index) => (
                        <li key={index}>
                            <h2>{interes.nombre}</h2>
                            <p>{interes.descripcion}</p>
                            <button class="btn btn-primary" onClick={() => handleEdit(interes.id)}>Editar</button>
                            <button class="btn btn-primary" onClick={() => handleDelete(interes.id)}>Borrar</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Cargando intereses...</p>  
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
                <button class="btn btn-primary" onClick={handleCreate}>Crear</button>
            </div>
            <Link to="/">
				<button className="btn btn-primary mt-5">Back home</button>
			</Link>
        </div>
    );
};
