import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { Partner_Eventos } from "../component/partner_eventos";
import { Navigate } from "react-router-dom";
import "../../styles/home.css";

export const Partners_Home = () => {
	const { store } = useContext(Context);
	const navigate = useNavigate(); // Usar navigate
	// Verificar autenticación cuando se monta el componente
	useEffect(() => {
		// Si el usuario no está autenticado o no tiene un partner_id, redirigir a la página de login
		if (!store.auth || !localStorage.getItem("token")) {
			navigate("/login"); // Redirigir a la página de login si no está autenticado
		}
	}, [store.auth, navigate]);

	return (
		<>		
			<div className="text-center my-5">
				<h1>Estás en el área privada de esta cuenta de Partner</h1>
			</div>
			{/* Verificar si el usuario está autenticado y tiene un partner_id */}
			{store.auth && store.partner_id && (  // Cambiar partnerId por partner_id
				<button
					className="btn btn-info me-3"
					onClick={() => navigate(`/partner-profile/${store.partner_id}`)} // Usar partner_id del store
					style={{ backgroundColor: '#A7D0CD' }}
				>
					Mi Perfil de Partner
				</button>
			)}
			<Partner_Eventos />
		</>
	);
};
