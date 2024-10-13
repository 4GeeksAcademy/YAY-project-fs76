import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/navbar.css";

export const Navbar = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

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

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
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
                        {!token && (
                            <>
                                <li className="nav-item">
                                    <Link to="/" style={{ textDecoration: 'none' }}>
                                        <a className="nav-link active">Inicio</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" style={{ textDecoration: 'none' }}>Eventos</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" style={{ textDecoration: 'none' }}>Área Partner</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ textDecoration: 'none' }}>
                                        Acerca de Yay
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#" style={{ textDecoration: 'none' }}>Sobre nosotros</a></li>
                                        <li><a className="dropdown-item" href="#" style={{ textDecoration: 'none' }}>Conviértete en Partner</a></li>
                                        <li><a className="dropdown-item" href="#" style={{ textDecoration: 'none' }}>Preguntas frecuentes</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link me-3" style={{ textDecoration: 'none' }}>Contacto</a>
                                </li>
                                <Link to="/usuarios">
                                    <button className="btn text-light" style={{ backgroundColor: '#7c488f', fontSize: '1.2rem', fontWeight: '300', color: '#333', letterSpacing: '0.05rem' }}>
                                        <i className="fa-solid fa-circle-user fs-4"></i> Iniciar Sesión
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
                    </ul>
                </div>
            </div>
        </nav>
    );
};