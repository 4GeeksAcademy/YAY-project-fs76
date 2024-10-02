import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Entidades = () => {
  const { store, actions } = useContext(Context);
  const [editing, setEditing] = useState({});
  const [tipo, setTipo] = useState({});
  const [newEntity, setNewEntity] = useState({ tipo: '' });
  const [selectedEntidad, setSelectedEntidad] = useState(null);

  useEffect(() => {
    actions.getEntidades();
  }, [actions]);

  const handleEdit = (id) => {
    setEditing({ ...editing, [id]: true });
  };

  const handleSave = async (id) => {
    await actions.updateEntidad(id, { tipo: tipo[id] });
    setEditing({ ...editing, [id]: false });
    actions.getEntidades();
  };

  const handleCreateEntity = async () => {
    await actions.createEntidad(newEntity);
    setNewEntity({ tipo: '' });
    actions.getEntidades();
  };

  const handleDelete = async (id) => {
    await actions.deleteEntidad(id);
    actions.getEntidades();
  };

  return (
    <div>
      <h1>Tipo de Entidades</h1>
      <div className="row">
        <div className="col-md-4">
          <h5 className="card-title">Crear Entidad</h5>
          <select
            value={newEntity.tipo}
            onChange={(e) => setNewEntity({ tipo: e.target.value })}
          >
            <option value="">Seleccione un tipo</option>
            <option value="Privado">Privado</option>
            <option value="Público">Público</option>
            <option value="ONG">ONG</option>
          </select>
          <button className="btn btn-primary" onClick={handleCreateEntity}>
            Crear
          </button>
        </div>
        {store.entidades.map((entidad) => (
          <div key={entidad.id} className="col-md-4">
            <div className="card">
              <div className="card-body">
                {editing[entidad.id] ? (
                  <div>
                    <select
                      value={tipo[entidad.id] || entidad.tipo}
                      onChange={(e) => setTipo({ ...tipo, [entidad.id]: e.target.value })}
                    >
                      <option value="Privado">Privado</option>
                      <option value="Público">Público</option>
                      <option value="ONG">ONG</option>
                    </select>
                    <button className="btn btn-primary" onClick={() => handleSave(entidad.id)}>
                      Guardar
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(entidad.id)}>
                      Eliminar
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>Tipo: {entidad.tipo}</p>
                    <button className="btn btn-primary" onClick={() => handleEdit(entidad.id)}>
                      Editar
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(entidad.id)}>
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entidades;