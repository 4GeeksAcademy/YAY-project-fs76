import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Evento_Card = () => {
    const { store, actions } = useContext(Context);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        actions.loadEventos();
    }, []);

    const evento = store.eventos.find((evento) => evento.id === parseInt(params.theid));



    return (
        <>
            {evento ? (
                <div className="container w-100 d-flex justify-content-center">
                    <div className="card my-5 d-flex flex-row w-100" key={evento.id}>
                        <div className="profile me-3 col-6">
                            <img src="https://cdn-icons-png.freepik.com/512/3544/3544735.png" alt="profileImage" className="rounded-circle w-75" />
                        </div>
                        <div className="my-5">
                            <h4 className="mb-2">{evento.nombre}</h4>
                            <span className="text-muted d-block mb-3">
                                <b>Fecha</b>: {evento.fecha}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Horario</b>: {evento.horario}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Ciudad</b>: {evento.ciudad}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Plazas</b>: {evento.cupo}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Dificultad</b>: {evento.dificultad}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Precio</b>: {evento.precio}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Accesibilidad</b>: {evento.accesibilidad}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Observaciones</b>: {evento.observaciones}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Descripción</b>: {evento.breve_descripcion}
                            </span>


                            <div className="d-flex justify-content-start align-items-end">
                            <Link to={`/formulario-evento/${evento.id}`}>
                                <button className="btn btn-icon">
                                    <i className="fa-solid fa-pencil" />
                                </button>
                            </Link>
                                <button className="btn btn-icon" onClick={() => {
                                    actions.deleteEvento(evento.id);
                                }}>
                                    <i className="fa-solid fa-trash" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className="m-5 p-3 alert-danger rounded">
                    <i className="fa-solid fa-triangle-exclamation"></i> Evento no encontrado
                </h1>
            )}
        </>
    );

};

Evento_Card.propTypes = {
    match: PropTypes.object
};