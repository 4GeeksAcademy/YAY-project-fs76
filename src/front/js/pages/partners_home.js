import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Partner_Eventos } from "../component/partner_eventos";
import { PartnerMisEventos } from "../component/partner_mis_eventos";
import "../../styles/partnersHome.css";

export const Partners_Home = () => {
    const { store, actions } = useContext(Context); 
    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const auth = localStorage.getItem("auth");
        const partner_id = localStorage.getItem("partner_id");
    
        if (!token || !auth || !partner_id) {
            navigate("/partner-login");
        } else {
            actions.setAuthStatePartner({
                auth: auth,
                token: token,
                partner_id: partner_id,
            });
            setLoading(false);
        }
    }, [navigate, actions]);
    
    if (loading) {
        return <div>Cargando...</div>; 
    }

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
