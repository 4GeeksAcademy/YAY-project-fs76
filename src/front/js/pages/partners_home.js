import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";


export const Partners_Home = () => {
	const { store, actions } = useContext(Context);

	const isAuthenticated = store.auth;

	if (!isAuthenticated) {
		return <Navigate to="/" />;
	}

	return (
		<div className="text-center my-5">
			<h1>Estás en el área privada de esta cuenta de Partner</h1>
			<Link to="/formulario-evento">
				<button className="btn btn-success">Crear Evento</button>
			</Link>
		</div>
	);
};
