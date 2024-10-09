import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Partner_Eventos } from "../component/partner_eventos";
import { Navigate } from "react-router-dom";
import "../../styles/home.css";


export const Partners_Home = () => {
	const { store, actions } = useContext(Context);
	const userId = localStorage.getItem("user_id");

	const isAuthenticated = store.auth;

	if (!isAuthenticated || userId) {
		return <Navigate to="/" />;
	}

	return (
		<>		
		<div className="text-center my-5">
			<h1>Estás en el área privada de esta cuenta de Partner</h1>
		</div>
			<Partner_Eventos />
		</>

	);
};
