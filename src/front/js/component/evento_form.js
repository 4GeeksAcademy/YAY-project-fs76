import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

export const Evento_Form = () => {
    const { store, actions } = useContext(Context);
    const [nuevoEvento, setNuevoEvento] = useState({
        nombre: '',
        fecha: '',
        hora_inicio: '',
        hora_fin: '',
        ciudad: '',
        codigo_postal: '',
        breve_descripcion: '',
        accesibilidad: false,
        dificultad: '',
        precio: '',
        cupo: '',
        observaciones: ''
    });
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const { theid } = useParams(); 

    useEffect(() => {
        // Cargar el evento si el ID está presente
        if (theid) {
            const evento = store.eventos.find(evento => evento.id === parseInt(theid));
            if (evento) {
                const fechaParts = evento.fecha.split(' '); // Suponiendo que la fecha está en formato "DD de Mes de YYYY"
                const dia = fechaParts[0];
                const mes = new Date(Date.parse(fechaParts[2] + " " + fechaParts[1] + " 1")).getMonth() + 1; // Convertir el mes a número
                const anio = fechaParts[4];
                const formattedDate = `${anio}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`; // Formato 'YYYY-MM-DD'
    
                setNuevoEvento({
                    ...evento,
                    fecha: formattedDate, // Asignar la fecha formateada
                    hora_inicio: evento.horario.split(' - ')[0], 
                    hora_fin: evento.horario.split(' - ')[1]
                }); 
            }
        }
    }, [theid, store.eventos]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { nombre, fecha, hora_inicio, hora_fin, ciudad, codigo_postal, breve_descripcion, dificultad, precio, cupo, observaciones } = nuevoEvento;
    
        // Validación de campos
        if (!nombre || !fecha || !hora_inicio || !hora_fin || !ciudad || !codigo_postal || !breve_descripcion || !dificultad || !precio || !cupo || !observaciones) {
            if (!alert || alert.type !== 'danger') {
                setAlert({ type: 'danger', message: 'Por favor, complete todos los campos' });
            }
        } else {
            // Formatear la fecha
            const formattedDate = new Date(fecha).toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
            const formattedStartTime = hora_inicio; // formato 'HH:MM'
            const formattedEndTime = hora_fin; // formato 'HH:MM'
    
            // Crear un nuevo objeto con los datos formateados
            const eventoData = {
                ...nuevoEvento,
                fecha: formattedDate,
                hora_inicio: formattedStartTime,
                hora_fin: formattedEndTime,
            };
    
            // Enviar los datos al backend
            if (theid) {
                // Si theid está presente, actualiza el evento
                actions.updateEvento(theid, eventoData, () => {
                    setAlert({ type: 'success', message: ' Evento updated successfully' });
                    setTimeout(() => {
                        navigate('/eventos');
                    }, 1000);
                });
            } else {
                // Si theid no está presente, crea un nuevo evento
                actions.addEvento(eventoData, () => {
                    setAlert({ type: 'success', message: ' Evento created successfully' });
                    setTimeout(() => {
                        navigate('/eventos');
                    }, 1000);
                }, () => {
                    setAlert({ type: 'danger', message: ' Error creating event' });
                });
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="m-5 mx-auto w-75">
                <h1 className="text-center">Crear/Editar Evento</h1>
                {alert && (
                    <div className={`alert fade show alert-${alert.type}`} role="alert">
                        {alert.type === 'danger' ? <i className="fa-solid fa-triangle-exclamation"></i> : <i className="fa-solid fa-circle-check"></i>}
                        {alert.message}
                        <i type="button" className="btn-close float-end" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></i>
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="nombreInput" className="form-label">Nombre del Evento</label>
                    <input type="text" value={nuevoEvento.nombre} onChange={(e) => setNuevoEvento({ ...nuevoEvento, nombre: e.target.value })} className="form-control" id="nombreInput" placeholder="Introduzca nombre del evento..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="fechaInput" className="form-label">Fecha del Evento</label>
                    <input type="date" value={nuevoEvento.fecha} onChange={(e) => setNuevoEvento({ ...nuevoEvento, fecha: e.target.value })} className="form-control" id="fechaInput" />
                </div>
                <div className="mb-3">
                    <label htmlFor="hora_inicioInput" className="form-label">Hora de inicio</label>
                    <input type="time" value={nuevoEvento.hora_inicio} onChange={(e) => setNuevoEvento({ ...nuevoEvento, hora_inicio: e.target.value })} className="form-control" id="hora_inicioInput" />
                </div>
                <div className="mb-3">
                    <label htmlFor="hora_finInput" className="form-label">Hora de fin</label>
                    <input type="time" value={nuevoEvento.hora_fin} onChange={(e) => setNuevoEvento({ ...nuevoEvento, hora_fin: e.target.value })} className="form-control" id="hora_finInput" />
                </div>
                <div className="mb-3">
                    <label htmlFor="ciudadInput" className="form-label">Ciudad</label>
                    <input type="text" value={nuevoEvento.ciudad} onChange={(e) => setNuevoEvento({ ...nuevoEvento, ciudad: e.target.value })} className="form-control" id="ciudadInput" placeholder="Introduzca ciudad..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="codigo_postalInput" className="form-label">Código Postal</label>
                    <input type="text" value={nuevoEvento.codigo_postal} onChange={(e) => setNuevoEvento({ ...nuevoEvento, codigo_postal: e.target.value })} className="form-control" id="codigo_postalInput" placeholder="Introduzca código postal..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="breve_descripcionInput" className="form-label">Breve Descripción</label>
                    <input type="text" value={nuevoEvento.breve_descripcion} onChange={(e) => setNuevoEvento({ ...nuevoEvento, breve_descripcion: e.target.value })} className="form-control" id="breve_descripcionInput" placeholder="Introduzca breve descripción..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="accesibilidadInput" className="form-label">Accesibilidad</label>
                    <input type="checkbox" checked={nuevoEvento.accesibilidad} onChange={(e) => setNuevoEvento({ ...nuevoEvento, accesibilidad: e.target.checked })} className="form-check-input" id="accesibilidadInput" />
                </div>
                <div className="mb-3">
                    <label htmlFor="dificultadInput" className="form-label">Dificultad</label>
                    <input type="text" value={nuevoEvento.dificultad} onChange={(e) => setNuevoEvento({ ...nuevoEvento, dificultad: e.target.value })} className="form-control" id="dificultadInput" placeholder="Introduzca dificultad..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="precioInput" className="form-label">Precio</label>
                    <input type="number" value={nuevoEvento.precio} onChange={(e) => setNuevoEvento({ ...nuevoEvento, precio: e.target.value })} className="form-control" id="precioInput" placeholder="Introduzca precio..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="cupoInput" className="form-label">Cupo</label>
                    <input type="number" value={nuevoEvento.cupo} onChange={(e) => setNuevoEvento({ ...nuevoEvento, cupo: e.target.value })} className="form-control" id="cupoInput" placeholder="Introduzca cupo..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="observacionesInput" className="form-label">Observaciones</label>
                    <input type="text" value={nuevoEvento.observaciones} onChange={(e) => setNuevoEvento({ ...nuevoEvento, observaciones: e.target.value })} className="form-control" id="observacionesInput" placeholder="Introduzca observaciones..." />
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary w-100">Guardar</button>
                </div>
                <Link to="/eventos">o volver a la lista de eventos</Link>
                
            </form>
        </>
    );
};