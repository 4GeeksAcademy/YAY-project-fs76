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
					{/* <Link to="/userInterest">
                        <button className="btn btn-primary me-3">Intereses usuario</button>
                    </Link> */}
					{/* <Link to="/entidades">
					<button className="btn me-3 text-light" style={{backgroundColor: '#7c488f'}}>Lista de Entidades</button>
					</Link> */}
					{/* <Link to="/eventos">
						<button className="btn btn-primary me-3">Lista de Eventos</button>
					</Link> */}
					<Link to="/partners">
						<button className="btn me-3 text-light" style={{ backgroundColor: '#7c488f' }}>Partners</button>
					</Link>
					<Link to="/usuarios">
						<button className="btn me-3 text-light" style={{ backgroundColor: '#7c488f' }}>Usuarios</button>
					</Link>
					{/* <Link to="/mapa">
						<button className="btn btn-primary me-3">Mapa</button>
					</Link> */}
					{/* <Link to="/demo">
						<button className="btn btn-secondary">Check the Context in action</button>
					</Link> */}
					{/* Botón de "Mi Perfil" */}
					{store.auth && userId && (
						<button
							className="btn me-3"
							onClick={() => navigate(`/profile/${userId}`)}
							style={{ backgroundColor: '#A7D0CD', color: '#646464' }}
						>
							Mi Perfil
						</button>
					)}
					{store.auth && userId && (
						<button className="btn me-3" onClick={() => navigate('/eventos')} style={{ backgroundColor: '#A7D0CD', color: '#646464' }}>
							Eventos Disponibles
						</button>
					)}

					{store.auth === true ? (
						<button
							className="enter btn btn-secondary my-auto"
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