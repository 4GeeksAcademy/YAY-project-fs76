import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
   
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

 
   
    function handleLogout() {
        setLoggingOut(true);
        actions.logout();
        localStorage.removeItem("token"); 
        localStorage.removeItem("user_id"); 
        localStorage.removeItem("nombre"); 
        navigate("/logout", { state: { from: true } });
    }

    
    const userId = localStorage.getItem("user_id"); 
    const nombre = localStorage.getItem("nombre"); 



    return (
        
        <nav className="navbar navbar-light bg-light">
            {store.auth ? (
                <p>Bienvenido a YAY</p> 
            ) : (
                <p>Iniciar sesión</p>
            )}
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1"><b>YAY</b></span>
                </Link>
                <div className="ml-auto">
                    <Link to="/interes">
                        <button className="btn btn-primary me-3">Lista de Intereses</button>
                    </Link>
                    <Link to="/entidades">
                        <button className="btn btn-primary me-3">Lista de Entidades</button>
                    </Link>
                    <Link to="/eventos">
                        <button className="btn btn-primary me-3">Lista de Eventos</button>
                    </Link>
                    <Link to="/partners">
                        <button className="btn btn-primary me-3">Partners</button>
                    </Link>
                    <Link to="/usuarios">
                        <button className="btn btn-primary me-3">Usuarios</button>
                    </Link>

                    {/* Botón de "Mi Perfil" */}
                    {store.auth && (
                        <button
                            className="btn btn-info me-3"
                            onClick={() => navigate(`/profile/${userId}`)} 
                        >
                            Mi Perfil
                        </button>
                    )}

                    {store.auth && (
                        <button
                            className="enter btn btn-warning my-auto"
                            onClick={handleLogout} 
                        >
                            Cerrar Sesión
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};
