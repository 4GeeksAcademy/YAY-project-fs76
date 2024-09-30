import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
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
					<Link to="/demo">
						<button className="btn btn-secondary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
