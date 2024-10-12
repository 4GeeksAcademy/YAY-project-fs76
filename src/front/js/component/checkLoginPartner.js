import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"; 
import "../../styles/home.css";

export const CheckLoginPartner = () => {
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

    // Función para manejar el logout
    const handleLogout = () => {
        setLoggingOut(true);
        actions.logout(); // Asegúrate de que esta acción actualice el estado de autenticación en el store
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("nombre");
        localStorage.removeItem("partner_id");
        navigate("/logout", { state: { from: true } });
    };

    // Verificar autenticación cuando se monta el componente
    useEffect(() => {
        // Si el usuario no está autenticado o no tiene un partner_id, redirigir a la página de login
        if (!store.auth || !localStorage.getItem("token")) {
            navigate("/partner-login"); // Redirigir a la página de login si no está autenticado
        }
    }, [store.auth, navigate]);

    return (
        <>		
            <div className="text-center my-5">
                <h1>Estás en el área privada de esta cuenta de Partner</h1>
            </div>
            <h1>Hace falta verificar si es usted para continuar</h1>
            <h2>Por favor vuelva a login para autentificar</h2>
            <button
                className="enter btn btn-secondary my-auto"
                onClick={handleLogout}
                disabled={loggingOut} // Desactivar el botón mientras se está cerrando sesión
            >
                {loggingOut ? "Saliendo..." : "Verificar"}
            </button>
        </>
    );
};
