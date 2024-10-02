import React, { useContext, useState }  from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [loggingOut, setLoggingOut] = useState(false);

	function handleLogout() {
		setLoggingOut(true);
		actions.logout();
		navigate("/logout", { state: { from: true } });
	}

	return (
		<nav className="navbar navbar-light bg-light">
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
					<Link to="/login">
						<button className="btn btn-primary me-3">Login</button>
					</Link>
					{/* <Link to="/demo">
						<button className="btn btn-secondary">Check the Context in action</button>
					</Link> */}
					{store.auth === true ? (
						<button
							className="enter btn btn-warning my-auto text-light"
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
