import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../store/appContext';
import { Link } from 'react-router-dom';

export const Landing_Form = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container content-space-2 content-space-lg-3">
            <div className="row justify-content-lg-between align-items-md-center">
                <div className="col-md-5 mb-7 mb-md-0">
                    <div className="mb-5">
                        <h1>Pasar el tiempo en tu barrio, con los tuyos</h1>
                        <h4 style={{fontWeight: '300'}}>Especializados en conectar personas de la misma generación para crear nuevos recuerdos y nuevas amistades.</h4>
                    </div>

                    <h3>¿Por qué YAY?</h3>

                    {/* List Checked */}
                    <ul className="list-checked landing-check list-checked-primary">
                        <li className="list-checked-item landing-check-item" style={{ fontSize: '20px' }}><i className="fa-solid fa-check" style={{ color: '#7c488f' }}></i> Plataforma de uso gratuito</li>
                        <li className="list-checked-item landing-check-item" style={{ fontSize: '20px' }}><i className="fa-solid fa-check" style={{ color: '#7c488f' }}></i> Fácil manejo y sin permanencia </li>
                        <li className="list-checked-item landing-check-item" style={{ fontSize: '20px' }}><i className="fa-solid fa-check" style={{ color: '#7c488f' }}></i> Chat en directo con IA <span className="badge text-dark rounded-pill ms-1" style={{ backgroundColor: '#A7D0CD'}}>Beta</span></li>
                    </ul>
                    {/* End List Checked */}
                </div>
                {/* End Col */}

                <div className="col-md-7 col-lg-6">
                    {/* Form */}
                    <form className="js-validate needs-validation" noValidate>
                        {/* Card */}
                        <div className="card card-formulario">
                            <div className="card-header text-center py-5 mb-0" style={{ backgroundColor: '#de8f79' }}>
                                <h2 className="card-header-title text-white">Pregúntanos tus<span className="badge rounded-pill ms-1" style={{ backgroundColor: '#A7D0CD', color: '#494949', fontWeight: '500' }}> dudas</span></h2>
                            </div>

                            <div className="card-body">
                                <div className="row gx-3">
                                    <div className="col-sm-12">
                                        {/* Form */}
                                        <div className="mb-4">
                                            <label className="form-label" htmlFor="signupHeroFormWorkEmail">Email</label>
                                            <input type="email" className="form-control form-control-lg" name="signupHeroFormNameWorkEmail" id="signupHeroFormWorkEmail" placeholder="email@site.com" aria-label="email@site.com" required />
                                            <span className="invalid-feedback">Please enter your email address</span>
                                        </div>
                                        {/* End Form */}
                                    </div>
                                </div>
                                {/* End Row */}

                                {/* Form */}
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="signupHeroForMensaje">Mensaje</label>
<textarea className="form-control form-control-lg" name="signupHeroFormMensaje" id="signupHeroFormMensaje" rows="5" placeholder="Escribe tu mensaje aquí..." aria-label="Mensaje" required ></textarea>

                                    <span className="invalid-feedback">Por favor, introduzca un mensaje</span>
                                </div>
                                {/* End Form */}


                                {/* Check */}
                                <div className="form-check mb-4">
                                    <input type="checkbox" className="form-check-input" id="signupHeroFormPrivacyCheck" name="signupFormPrivacyCheck" required />
                                    <label className="form-check-label small" htmlFor="signupHeroFormPrivacyCheck"> Por favor, para poder darle una respuesta, acepte la <a href="https://policies.google.com/privacy?hl=en-US" target="_blank" style={{color: '#de8f79'}}>Política de Privacidad</a></label>
                                    <span className="invalid-feedback">Por favor, acepte el tratamiento de sus datos para poder contestarle</span>
                                </div>
                                {/* End Check */}

                                <div className="row align-items-center">
                               
                                    {/* End Col */}

                                    <div className=" text-sm-end">
                                        <button type="submit" className="btn btn-lg" style={{ backgroundColor: '#7c488f', color: 'white' }}>Enviar</button>
                                    </div>
                                    {/* End Col */}
                                </div>
                                {/* End Row */}
                            </div>
                        </div>
                        {/* End Card */}
                    </form>
                    {/* End Form */}
                </div>
                {/* End Col */}
            </div>
            {/* End Row */}
        </div>
    )
}
