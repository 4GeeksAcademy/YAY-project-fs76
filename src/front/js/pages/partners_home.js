import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { Partner_Eventos } from "../component/partner_eventos";
import { PartnerMisEventos } from "../component/partner_mis_eventos";
import "../../styles/partnersHome.css"; // Archivo de CSS para estilos personalizados

export const Partners_Home = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate(); // Usar navigate


    useEffect(() => {
        if (!store.auth && !localStorage.getItem("token")) {
            navigate("/partner-login"); 
        }
    }, [store.auth, navigate]);

    return (
        <div className="partners-home-container container mt-5">
            <div className="text-center mb-5">
                <h1>Bienvenidos a Yay</h1>
            </div>
            <div className="eventos-container p-3">
                <h2 className="text-center">Mis Eventos</h2>
                <PartnerMisEventos />
            </div>
            <div className="eventos-container p-3">
                <h2 className="text-center">Eventos</h2>
                <Partner_Eventos />
            </div>
        </div>
    );
};
