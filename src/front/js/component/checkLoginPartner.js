import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"; 
import "../../styles/checkLoginPartner.css"; // Nuevo archivo CSS para estilos personalizados

export const CheckLoginPartner = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); 
    const [loggingOut, setLoggingOut] = useState(false);

    // Obtén el partnerId de localStorage
    const partnerIdFromLocalStorage = localStorage.getItem('partner_id');
    const partnerId = store.partner_id || partnerIdFromLocalStorage; 

    // Función para manejar el logout
    const handleLogout = () => {
        alert("Tendrá que hacer login nuevamente.");
        const token = localStorage.getItem("token");
        if (!token) {
            actions.logout(); 
        }
        setLoggingOut(true);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("nombre");
        localStorage.removeItem("partner_id");
        navigate("/logout", { state: { from: true } });
    };

    // Verificar autenticación cuando se monta el componente
    useEffect(() => {
        if (!store.auth || !localStorage.getItem("token")) {
            navigate("/partner-login"); // Redirigir a la página de login si no está autenticado
        }
    }, [store.auth, navigate]);

    return (
        <div className="checkLogin-container d-flex justify-content-center align-items-center min-vh-100">
            <div className="checkLogin-card text-center">
                <div className="checkLogin-card-body">
                    <h1 className="checkLogin-title mb-4">Área privada de Partner</h1>
                    <p className="checkLogin-text">Hace falta verificar si es usted para continuar.</p>
                    <p className="checkLogin-text">Por favor, seleccione "Verificar" para autentificarse.</p>
                    <button
                        className="checkLogin-btn btn btn-primary mt-4"
                        onClick={handleLogout}
                        disabled={loggingOut}
                    >
                        {loggingOut ? "Saliendo..." : "Verificar"}
                    </button>
                </div>
            </div>
        </div>
    );
};
