import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/navbar.css";

export const Navbar = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation(); // Hook para obtener la ubicación actual

    const handleLogout = () => {
        actions.logout();
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("nombre");
        localStorage.removeItem("partner_id");
        navigate("/logout", { state: { from: true } });
    };

    const userId = localStorage.getItem("user_id");
    const partnerId = localStorage.getItem("partner_id");
    const token = localStorage.getItem("token");


    const isSignin = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/partners-login" || location.pathname === "/partners-signup" || location.pathname === "/forgot-password" ;
    const isPartner =  location.pathname === "/partners-login" || location.pathname === "/partners-signup" || location.pathname === "/partners-forgot-password";

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light w-100" style={{ zIndex: '8' }}>
            <div className="container-fluid" style={{ width: '85rem' }}>
                <Link to="/">
                    <img
                        src="https://i.ibb.co/SVvvn2D/logo-sin-fondo-y-sin-slogan.png"
                        alt="logo-ai"
                        style={{ height: '100%', maxHeight: '50px', width: 'auto' }}
                    />
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        {isSignin ? (
                            <>
                                <li className="nav-item">
                                    <Link to={-1} className="nav-link" style={{ textDecoration: 'none' }}>
                                        <i className="fa-solid fa-angle-left small me-1"></i>
                                        Volver
                                    </Link>
                                </li>
                                {!isPartner ? (
                                <Link to="/partners-login">
                                    <button className="btn text-light ms-5 mb-0 mt-2" style={{ backgroundColor: '#7c488f', fontSize: '1.2rem', fontWeight: '300', color: '#333', letterSpacing: '0.05rem' }}>
                                    <i class="fa-solid fa-user-tie fs-4"></i> Partner
                                    </button>
                                </Link>
                                ) : null}
                            </>
                            
                        ) : (
                            <>
                                {!token && (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/" style={{ textDecoration: 'none' }}>
                                                <a className="nav-link active">Inicio</a>
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ textDecoration: 'none' }}>
                                            Eventos
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <Link to="/#land-eventos">
                                                <li><a className="dropdown-item" href="#" style={{ textDecoration: 'none' }}>Eventos destacados</a></li>
                                                </Link>
                                                <Link to="/#land-mapa">
                                                <li><a className="dropdown-item" href="#" style={{ textDecoration: 'none' }}>Eventos en tu zona</a></li>
                                                </Link>
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" style={{ textDecoration: 'none' }}>Área Partner</a>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ textDecoration: 'none' }}>
                                                Acerca de Yay
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <Link to="/#land-about">
                                                <li><a className="dropdown-item" href="#" style={{ textDecoration: 'none' }}>Sobre nosotros</a></li>
                                                </Link>
                                                <Link to="/#land-partner">
                                                <li><a className="dropdown-item" href="#" style={{ textDecoration: 'none' }}>Conviértete en Partner</a></li>
                                                </Link>
                                                <Link to="/#land-contacto">
                                                <li><a className="dropdown-item" href="#" style={{ textDecoration: 'none' }}>Pregúntanos</a></li>
                                                </Link>
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                        <Link to="/#land-contacto">
                                            <a className="nav-link me-3" style={{ textDecoration: 'none' }}>Contacto</a>
                                            </Link>
                                        </li>
                                        <Link to="/login">
                                            <button className="btn text-light" style={{ backgroundColor: '#7c488f', fontSize: '1.2rem', fontWeight: '300', color: '#333', letterSpacing: '0.05rem' }}>
                                                <i className="fa-solid fa-circle-user fs-4"></i> Entrar
                                            </button>
                                        </Link>
                                    </>
                                )}

                                {token && userId && (
                                    <>
                                        <button className="btn me-3" onClick={() => navigate(`/profile/${userId}`)} style={{ backgroundColor: '#7c488f', color: 'white' }}>
                                            Mi Perfil
                                        </button>
                                        <button className="btn me-3" onClick={() => navigate('/eventos')} style={{ backgroundColor: '#7c488f', color: 'white' }}>
                                            Eventos Disponibles
                                        </button>
                                    </>
                                )}

                                {token && partnerId && (
                                    <button className="btn me-3" onClick={() => navigate(`/partner-profile/${partnerId}`)} style={{ backgroundColor: '#7c488f', color: 'white' }}>
                                        Mi Perfil de Partner
                                    </button>
                                )}

                                {token ? (
                                    <button className="enter btn btn-secondary my-auto" onClick={handleLogout}>
                                        Cerrar Sesión
                                    </button>
                                ) : null}
                            </>
                  
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};