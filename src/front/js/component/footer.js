import React, { Component } from "react";

export const Footer = () => {

		return (
			<footer className="bg-dark mt-5">
				<div className="container pb-1 pb-lg-5">
					<div className="row content-space-t-2">
						<div className="col-lg-3 mb-7 mb-lg-0">
							{/* Logo */}
							<div className="mb-5">
								<a className="navbar-brand" href="../index.html" aria-label="Space">
									<img className="navbar-brand-logo" src="https://i.ibb.co/SVvvn2D/logo-sin-fondo-y-sin-slogan.png" alt="Image Description" />
								</a>
							</div>
							{/* End Logo */}
	
							{/* List */}
							<ul className="list-unstyled list-py-1">
								<li><a className="link-sm link-light" ><i className="fa-solid fa-location-dot"></i>Passeig de Gràcia, 104 - 08007, Barcelona</a></li>
								<li><a className="link-sm link-light" ><i class="fa-solid fa-mobile-screen"></i> (+34) 777 888 999</a></li>
								<li><a className="link-sm link-light" ><i class="fa-solid fa-envelope"></i> info@yay.com</a></li>
							</ul>
							{/* End List */}
						</div>
						{/* End Col */}
	
						<div className="col-sm mb-7 mb-sm-0">
							<h5 className="text-white mb-3">Compañia</h5>
							{/* List */}
							<ul className="list-unstyled list-py-1 mb-0">
								<li><a className="link-sm link-light" href="#">Sobre nosotros</a></li>
								<li><a className="link-sm link-light" href="#">Empleos <span className="badge bg-warning text-dark rounded-pill ms-1">Proceso abierto</span></a></li>
								<li><a className="link-sm link-light" href="#">Noticias</a></li>
								<li><a className="link-sm link-light" href="#">Reseñas<i className="bi-box-arrow-up-right small ms-1"></i></a></li>
								<li><a className="link-sm link-light" href="#">Publicítate</a></li>
							</ul>
							{/* End List */}
						</div>
						{/* End Col */}
	
						<div className="col-sm mb-7 mb-sm-0">
							<h5 className="text-white mb-3">Usuarios</h5>
							{/* List */}
							<ul className="list-unstyled list-py-1 mb-0">
								<li><a className="link-sm link-light" href="#">Regístrate <i className="bi-box-arrow-up-right small ms-1"></i></a></li>
								<li><a className="link-sm link-light" href="#">Inicio sesión</a></li>
								<li><a className="link-sm link-light" href="#">Eventos</a></li>
								<li><a className="link-sm link-light" href="#">Perfil</a></li>
							</ul>
							{/* End List */}
						</div>
						{/* End Col */}
	
						<div className="col-sm mb-7 mb-sm-0">
							<h5 className="text-white mb-3">Partner</h5>
							{/* List */}
							<ul className="list-unstyled list-py-1 mb-0">
								<li><a className="link-sm link-light" href="#">Registro</a></li>
								<li><a className="link-sm link-light" href="#">Inicio sesión</a></li>
								<li><a className="link-sm link-light" href="#">Estado</a></li>
								<li><a className="link-sm link-light" href="#">Inscripciones</a></li>
								<li><a className="link-sm link-light" href="#">Eventos</a></li>
							</ul>
							{/* End List */}
						</div>
						{/* End Col */}
	
						<div className="col-sm">
							<h5 className="text-white mb-3">Resources</h5>
							{/* List */}
							<ul className="list-unstyled list-py-1 mb-5">
								<li><a className="link-sm link-light" href="#"><i className="bi-question-circle-fill me-1"></i> Ayuda</a></li>
								<li><a className="link-sm link-light" href="#"><i className="bi-person-circle me-1"></i> Tu cuenta</a></li>
							</ul>
							{/* End List */}
						</div>
						{/* End Col */}
					</div>
					{/* End Row */}
	
					<div className="border-top border-white-10 my-7"></div>
	
					<div className="row mb-7">
						<div className="col-sm mb-3 mb-sm-0">
							{/* Socials */}
							<ul className="list-inline list-separator list-separator-light mb-0">
								<li className="list-inline-item">
									<a className="link-sm link-light" href="https://policies.google.com/privacy?hl=en-US" target="_blank">Política de Privacidad</a>
								</li>
								<li className="list-inline-item">
									<a className="link-sm link-light" href="#">Términos y condiciones de uso</a>
								</li>
								<li className="list-inline-item">
									<a className="link-sm link-light" href="#">Sitio Web</a>
								</li>
							</ul>
							{/* End Socials */}
						</div>
	
						<div className="col-sm-auto">
							{/* Socials */}
							<ul className="list-inline mb-0">
								<li className="list-inline-item">
									<a className="btn btn-soft-light btn-xs btn-icon" href="https://es.linkedin.com/school/4geeksacademyes/" target="_blank">
										<i className="bi-linkedin text-white"></i>
									</a>
								</li>
	
								<li className="list-inline-item">
									<a className="btn btn-soft-light btn-xs btn-icon" href="https://4geeksacademy.com/es/premios?lang=es" target="_blank">
										<i className="bi-google text-white"></i>
									</a>
								</li>
	
								<li className="list-inline-item">
									<a className="btn btn-soft-light btn-xs btn-icon" href="https://www.instagram.com/4geeksacademyes/?hl=es" target="_blank">
										<i className="bi-instagram text-white"></i>
									</a>
								</li>
	
								<li className="list-inline-item">
									<a className="btn btn-soft-light btn-xs btn-icon" href="https://github.com/4geeksacademy" target="_blank">
										<i className="bi-github text-white"></i>
									</a>
								</li>
	
								<li className="list-inline-item">
									{/* Button Group */}
									<div className="btn-group">
										<button type="button" className="btn btn-soft-light btn-xs dropdown-toggle" id="footerSelectLanguage" data-bs-toggle="dropdown" aria-expanded="false">
											<span className="d-flex align-items-center">
												<img className="avatar avatar-xss avatar-circle me-2" src="https://cdn-icons-png.flaticon.com/512/323/323365.png" alt="Image description" width="16" />
												<span>Español (SP)</span>
											</span>
										</button>
	
										<div className="dropdown-menu" aria-labelledby="footerSelectLanguage">
											<a className="dropdown-item d-flex align-items-center" href="#">
												<img className="avatar avatar-xss avatar-circle me-2" src="https://cdn-icons-png.flaticon.com/512/323/323365.png" alt="Image description" width="16" />
												<span>Español (SP)</span>
											</a>
											<a className="dropdown-item d-flex align-items-center disable" href="#">
												<img className="avatar avatar-xss avatar-circle me-2" src="https://images.vexels.com/content/163966/preview/england-flag-language-icon-circle-f39acf.png" alt="Image description" width="16" />
												<span>English (US)</span>
											</a>
										</div>
									</div>
									{/* End Button Group */}
								</li>
							</ul>
							{/* End Socials */}
						</div>
					</div>
	
					{/* Copyright */}
					<div className="w-md-85 text-lg-center mx-lg-auto">
						<p className="text-white-50 small">©2024-Yay.Todos los derechos reservados.</p>
						<p className="text-white-50 small">Si has llegado hasta aquí, y te ha gustado lo que has visto, no dudes en ponerte en contacto con nosotros. <br/> Estamos disponibles para incorporación inmediata y entuciasmados por empezar a ser profesionales en este sector.</p>
					</div>
					{/* End Copyright */}
				</div>
			</footer>
		);
	};
	

	// <footer className="footer opacity-75 mt-auto py-3 text-center">
	// 	<p  style={{ color: '#593367' }}>
	// 		Made by <b>Ramen</b> <i className="fa-solid fa-bowl-food"></i> in{" "}
	// 		<a href="http://www.4geeksacademy.com">4Geeks Academy</a>
	// 	</p>
	// </footer>

