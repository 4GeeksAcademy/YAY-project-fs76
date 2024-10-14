import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../store/appContext';
import { Link } from 'react-router-dom';



export const Landing_About = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <div className="position-relative m-5 me-0">
                <div className="container content-space-lg-3">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-9 mb-7 mb-md-0">
                            {/* Heading */}
                            <div className="col-10 w-md-65 mb-7 pe-5">
                                <h2 className="h1" style={{ letterSpacing: '3px' }}>En Yay creemos que hacer comunidad es importante</h2>
                                <p>
                                    Imagina tener la posibilidad de conocer a gente de tu misma generación, con intereses comunes y sin tener que desplazarte largos trayectos. Además, qué mejor para dejar atrás la vergüenza que compartir hobbies y experiencias. Aquí tendrás todo eso y más.
                                </p>
                            </div>
                            {/* End Heading */}

                            <div className="row">
                                <div className="col-md-4 mb-3 mb-md-0">
                                    {/* Card */}
                                    <div className="card cardAbout h-100">
                                        <div className="card-body">
                                            <span className="svg-icon text-primary mb-3">
                                                <svg width="24" height="24" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill='#6e908d' d="M335.5 4l288 160c15.4 8.6 21 28.1 12.4 43.5s-28.1 21-43.5 12.4L320 68.6 47.5 220c-15.4 8.6-34.9 3-43.5-12.4s-3-34.9 12.4-43.5L304.5 4c9.7-5.4 21.4-5.4 31.1 0zM320 160a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM144 256a40 40 0 1 1 0 80 40 40 0 1 1 0-80zm312 40a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM226.9 491.4L200 441.5l0 38.5c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32l0-38.5L61.1 491.4c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l37.9-70.3c15.3-28.5 45.1-46.3 77.5-46.3l19.5 0c16.3 0 31.9 4.5 45.4 12.6l33.6-62.3c15.3-28.5 45.1-46.3 77.5-46.3l19.5 0c32.4 0 62.1 17.8 77.5 46.3l33.6 62.3c13.5-8.1 29.1-12.6 45.4-12.6l19.5 0c32.4 0 62.1 17.8 77.5 46.3l37.9 70.3c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8L552 441.5l0 38.5c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32l0-38.5-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l36.3-67.5c-1.7-1.7-3.2-3.6-4.3-5.8L376 345.5l0 54.5c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32l0-54.5-26.9 49.9c-1.2 2.2-2.6 4.1-4.3 5.8l36.3 67.5c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8z" />
                                                </svg>
                                            </span>
                                            <h4 className="card-title mt-2">Fortalece la Comunidad</h4>
                                            <p className="card-text">Relacionarte con tus vecinos crea un ambiente más unido y seguro.</p>
                                            <a className="card-link" href="/sobre-nosotros" style={{color: '#de8f79'}}><h5>Conoce más <i className="fa-solid fa-chevron-right small ms-1"></i></h5></a>
                                        </div>
                                    </div>
                                    {/* End Card */}
                                </div>
                                {/* End Col */}

                                <div className="col-md-4 mb-3 mb-md-0">
                                    {/* Card */}
                                    <div className="card cardAbout h-100">
                                        <div className="card-body">
                                            <span className="svg-icon text-primary mb-3">
                                                <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill='#6e908d' d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm306.7 69.1L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />                                            </svg>
                                            </span>
                                            <h4 className="card-title mt-2">Explora Nuevas Oportunidades</h4>
                                            <p className="card-text">Participar en actividades te permite descubrir nuevos intereses y hacer amistades.</p>
                                            <a className="card-link" href="/sobre-nosotros" style={{color: '#de8f79'}}><h5>Descubre más <i className="fa-solid fa-chevron-right small ms-1"></i></h5></a>
                                        </div>
                                    </div>
                                    {/* End Card */}
                                </div>
                                {/* End Col */}

                                <div className="col-md-4">
                                    {/* Card */}
                                    <div className="card cardAbout h-100">
                                        <div className="card-body">
                                            <span className="svg-icon text-primary mb-3">
                                                <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill='#6e908d' d="M418.4 157.9c35.3-8.3 61.6-40 61.6-77.9c0-44.2-35.8-80-80-80c-43.4 0-78.7 34.5-80 77.5L136.2 151.1C121.7 136.8 101.9 128 80 128c-44.2 0-80 35.8-80 80s35.8 80 80 80c12.2 0 23.8-2.7 34.1-7.6L259.7 407.8c-2.4 7.6-3.7 15.8-3.7 24.2c0 44.2 35.8 80 80 80s80-35.8 80-80c0-27.7-14-52.1-35.4-66.4l37.8-207.7zM156.3 232.2c2.2-6.9 3.5-14.2 3.7-21.7l183.8-73.5c3.6 3.5 7.4 6.7 11.6 9.5L317.6 354.1c-5.5 1.3-10.8 3.1-15.8 5.5L156.3 232.2z" />
                                                </svg>
                                            </span>
                                            <h4 className="card-title mt-2">Crea Redes de Apoyo</h4>
                                            <p className="card-text">Tener amigos y amigas cerca, mejora la calidad de vida y ofrece una valiosa red de apoyo cernana.</p>
                                            <a className="card-link" href="/sobre-nosotros" style={{color: '#de8f79'}}><h5>Únete ahora <i className="fa-solid fa-chevron-right small ms-1"></i></h5></a>
                                        </div>
                                    </div>
                                    {/* End Card */}
                                </div>
                                {/* End Col */}
                            </div>
                            {/* End Row */}
                        </div>
                        {/* End Col */}
                    </div>
                    {/* End Row */}
                </div>

                <div className="banner-half-middle-x bg-img-start d-none d-md-block image-about"
                    style={{
                        backgroundImage: "url(https://i.ibb.co/jzf4q1V/file.jpg)",
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'top center',
                    }}>
                </div>
            </div>
        </>
    );
};