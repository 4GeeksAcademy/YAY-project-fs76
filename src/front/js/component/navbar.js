import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

    // Función para manejar el cierre de sesión
    function handleLogout() {
        setLoggingOut(true);
        actions.logout();
        localStorage.removeItem("token"); // Eliminar el token del localStorage al cerrar sesión
        localStorage.removeItem("user_id"); // Eliminar el user_id del localStorage al cerrar sesión
        navigate("/logout", { state: { from: true } });
    }

    // Obtenemos el userId desde localStorage
    const userId = localStorage.getItem("user_id"); // Obtener el ID del localStorage

    // Agregamos un console.log para verificar store y userId
    console.log("store.auth:", store.auth);  // Verifica si el usuario está autenticado
    console.log("userId:", userId);           // Verifica si el userId está disponible

    return (
        <nav className="navbar navbar-light bg-light">
            {store.auth ? (
                <p>Bienvenido, usuario {userId}</p> // Usa userId de localStorage
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
                    <Link to="/imageUpload">
                        <button className="btn btn-primary me-3">Agregar imágenes</button>
                    </Link>

                    {/* Botón de "Mi Perfil" */}
                    {store.auth && (
                        <button
                            className="btn btn-info me-3"
                            onClick={() => navigate(`/profile/${userId}`)} // Redirige al perfil del usuario autenticado
                        >
                            Mi Perfil
                        </button>
                    )}

                    {store.auth && (
                        <button
                            className="enter btn btn-warning my-auto"
                            onClick={handleLogout} // Llama a la función de logout
                        >
                            Cerrar Sesión
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};
