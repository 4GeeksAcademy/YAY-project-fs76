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
                    <Link to="/interes">
                        <button className="btn me-3 text-light" style={{ backgroundColor: '#7c488f' }}>Lista de Intereses</button>
                    </Link>
                    <Link to="/partners">
                        <button className="btn me-3 text-light" style={{ backgroundColor: '#7c488f' }}>Partners</button>
                    </Link>
                    <Link to="/usuarios">
                        <button className="btn me-3 text-light" style={{ backgroundColor: '#7c488f' }}>Usuarios</button>
                    </Link>
                    
                    {/* Botón de "Mi Perfil" */}
                    {store.auth && store.user_id && (
                        <button
                            className="btn btn-info me-3"
                            onClick={() => navigate(`/profile/${store.user_id}`)}
                            style={{ backgroundColor: '#A7D0CD' }}
                        >
                            Mi Perfil
                        </button>
                    )}

                    {/* Botón de "Mi Perfil de Partner" */}
                    {store.auth && partnerId && (
                        <button
                            className="btn btn-info me-3"
                            onClick={() => navigate(`/partner-profile/${partnerId}`)} // Utiliza el partnerId verificado
                            style={{ backgroundColor: '#A7D0CD' }}
                        >
                            Mi Perfil de Partner
                        </button>
                    )}
                    
                    {store.auth === true ? (
                        <button
                            className="enter btn btn-warning my-auto"
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
