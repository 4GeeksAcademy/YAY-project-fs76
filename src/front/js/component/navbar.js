import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

    // Obtén el partnerId de localStorage
    const partnerIdFromLocalStorage = localStorage.getItem('partner_id');
    const partnerId = store.partner_id || partnerIdFromLocalStorage; // Verifica ambos lugares para el partnerId

    // Debugging logs
    console.log("Auth:", store.auth);
    console.log("User ID:", store.user_id);
    console.log("Partner ID:", store.partner_id);
    console.log("Partner ID desde localStorage:", partnerIdFromLocalStorage);

    function handleLogout() {
        setLoggingOut(true);
        actions.logout();
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("nombre");
        localStorage.removeItem("partner_id");
        navigate("/logout", { state: { from: true } });
    }
    const userId = localStorage.getItem("user_id");
    const nombre = localStorage.getItem("nombre");

    return (
        <nav className="navbar navbar-light" style={{ backgroundColor: '#de8f79' }}>
            <div className="container">
                <Link to="/">
                    <img
                        src="https://i.ibb.co/BnKTPNk/logo-ai.png"
                        alt="logo-ai"
                        border="0"
                        style={{ height: '100%', maxHeight: '50px', width: 'auto' }}
                    />
                </Link>
                <div className="ml-auto">

                    {!store.auth && (
                        <>
                            <Link to="/eventos-yay">
                                <button className="btn me-3 text-light" style={{ backgroundColor: '#7c488f' }}>Eventos</button>
                            </Link>
                            <Link to="/sobre-nosotros">
                                <button className="btn me-3 text-light" style={{ backgroundColor: '#7c488f' }}>Sobre Yay</button>
                            </Link>
                            <Link to="/partners">
                                <button className="btn me-3 text-light" style={{ backgroundColor: '#7c488f' }}>Partners</button>
                            </Link>

                            <Link to="/usuarios">
                                <button className="btn me-3 text-light" style={{ backgroundColor: '#7c488f' }}>Usuarios</button>
                            </Link>
                        </>
                    )}

                    {store.auth && userId && (
                        <button
                            className="btn me-3"
                            onClick={() => navigate(`/profile/${userId}`)}
                            style={{ backgroundColor: '#7c488f', color: 'white' }}
                        >
                            Mi Perfil
                        </button>
                    )}

                    {store.auth && partnerId && (
                        <button
                            className="btn me-3"
                            onClick={() => navigate(`/partner-profile/${partnerId}`)} // Utiliza el partnerId verificado
                            style={{ backgroundColor: '#7c488f', color: 'white' }}
                        >
                            Mi Perfil de Partner
                        </button>
                    )}

                    {store.auth && userId && (
                        <button className="btn me-3" onClick={() => navigate('/eventos')} style={{ backgroundColor: '#7c488f', color: 'white' }}>
                            Eventos Disponibles
                        </button>
                    )}

                    {store.auth === true ? (
                        <button
                            className="enter btn btn-secondary my-auto"
                            onClick={() => handleLogout()}
                        >
                            Cerrar Sesión
                        </button>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </nav>
    );
};


