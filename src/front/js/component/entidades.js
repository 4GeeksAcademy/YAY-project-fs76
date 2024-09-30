import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Entidades = () => {
    const { store, actions } = useContext(Context);
    const [editing, setEditing] = useState({});
    const [tipo, setTipo] = useState({});
  
    useEffect(() => {
      if (!store.entidades || store.entidades.length === 0) {
        actions.getEntidades();
      }
    }, []);
  
    const handleEdit = (id) => {
      setEditing((prevEditing) => ({ ...prevEditing, [id]: true }));
    };
  
    const handleSave = async (id) => {
      try {
        const entidad = store.entidades.find((entidad) => entidad.id === id);
        const tipoValue = tipo[id];
        const response = await fetch(`/entidades/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre: entidad.nombre, tipo: tipoValue }),
        });
        const data = await response.json();
        store.entidades = store.entidades.map((entidad) => {
          if (entidad.id === id) {
            return { ...entidad, tipo: tipoValue };
          }
          return entidad;
        });
        setTipo({ ...tipo, [id]: tipoValue });
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleCancel = (id) => {
      setEditing((prevEditing) => ({ ...prevEditing, [id]: false }));
    };
  
    const handleTipoChange = (id, value) => {
      setTipo({ ...tipo, [id]: value });
      store.entidades = store.entidades.map((entidad) => {
        if (entidad.id === id) {
          return { ...entidad, tipo: value };
        }
        return entidad;
      });
    };
  
    return (
      <div>
        <h1>Tipo de Entidades</h1>
        {/* Muestra un mensaje de carga mientras las entidades se están obteniendo */}
        {store.entidades && store.entidades.length > 0 ? (
          <div className="row">
            {store.entidades.map((entidad) => (
              <div key={entidad.id} className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    {editing[entidad.id] ? (
                      <div>
                        <select
                          value={tipo[entidad.id]}
                          onChange={(e) => handleTipoChange(entidad.id, e.target.value)}
                        >
                          <option value="Privado">Privado</option>
                          <option value="Público">Público</option>
                          <option value="ONG">ONG</option>
                        </select>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSave(entidad.id)}
                        >
                          Guardar
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleCancel(entidad.id)}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h5 className="card-title">{entidad.nombre}</h5>
                        <p>Tipo: {entidad.tipo}</p>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(entidad.id)}
                        >
                          Editar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Cargando entidades...</p>
        )}
      </div>
    );
  };

export default Entidades;