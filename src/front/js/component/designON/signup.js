import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

import "../../../styles/signins.css";

export const Signup = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setMessage("Por favor, rellene todos los campos");
      return;
    }
    if (password.length < 8) {
      setMessage("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    const privacyCheck = document.getElementById("signupHeroFormPrivacyCheck");
    if (!privacyCheck.checked) {
      setMessage("Por favor, acepte nuestra Política de Privacidad.");
      return;
    }

    const partnerExists = await actions.checkPartnerExists(email);
    if (partnerExists) {
      setMessage("Ya existe un Usuario registrado con este correo electrónico");
      return;
    }

    const response = await actions.signup(email, password);
    if (response && response.user_id) {
      // alert("Usuario registrado exitosamente");
      actions.setUserId(response.user_id);
      sessionStorage.setItem('userId', response.user_id);
      navigate(`/completardatos/${response.user_id}`);


    } else {
      // alert("Error en el registro, revisa los datos");
    }
    
  };

  

  return (
    <>
      <div className="d-flex align-items-center min-h-100 fondo-sigin">
        <main id="content" role="main" className="flex-grow-1">
          {/* Form */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-5 col-xl-4 d-none d-lg-flex justify-content-center align-items-center min-vh-lg-100 position-relative bg-dark" style={{ backgroundImage: 'url(https://htmlstream.com/preview/front-v4.3.1/assets/svg/components/wave-pattern-light.svg)', zIndex: '-1' }}>
                <div className="flex-grow-1 p-5">
                  {/* Blockquote */}
                  <figure className="text-center">

                  <blockquote className="blockquote blockquote-light fs-3 mx-4">“¿Pensaron alguna vez que si no fuera por todos, nadie sería nada? ”</blockquote>

                    <figcaption className="blockquote-footer blockquote-light">
                      <div className="mb-3 ">
                        <img className="avatar avatarSignin" src="https://i.pinimg.com/originals/39/7e/8e/397e8ec1c08498202adb949586da111f.png" alt="Image Description" />
                      </div>

                      <span className="fs-5">Mafalda</span>
                      <span className="blockquote-footer-source fs-5">Quino | Argentina</span>
                    </figcaption>
                  </figure>
                  {/* End Blockquote */}

                  {/* Clients */}
                  <div className="position-absolute start-0 end-0 bottom-0 text-center p-5">
                    <div className="row justify-content-center">
                      <div className="col text-center py-3">
                        <img className="avatar avatar-lg avatar-4x3 signin4" src="https://clipart-library.com/images/dc4LABqni.png" alt="Logo" />
                      </div>
                      {/* End Col */}

                      <div className="col text-center py-3">
                        <img className="avatar avatar-lg avatar-4x3 signin4" src="https://www.caixabank.com/deployedfiles/caixabank_com/Estaticos/Imagenes/infografias/logoCaixa.png" alt="Logo" />
                      </div>
                      {/* End Col */}

                      <div className="col text-center py-3">
                        <img className="avatar avatar-lg avatar-4x3 signin4 iberia" src="https://www.totalisimo.com/wp-content/uploads/2023/03/iberia-logo-1.png" alt="Logo" />
                      </div>
                      {/* End Col */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-7 col-xl-8 d-flex justify-content-center align-items-center min-vh-lg-100">
                <div className="flex-grow-1 mx-auto" style={{ maxWidth: '28rem' }}>
                  {/* Heading */}
                  <div className="text-center mb-5 mb-md-7">
                    <h1>
                      <span className="text text-highlight-warning" style={{ color: 'black' }}>
                        <span className="js-typedjs">
                          Bienvenido a YAY
                        </span>
                      </span>
                    </h1>
                    <h5>Rellena todos los campos para empezar</h5>
                  </div>
                  {/* End Heading */}

                  {/* Form */}
                  <form className="js-validate needs-validation" noValidate onSubmit={handleSignup}>
                    {message && <div className="alert alert-warning d-flex align-items-center mx-2"><i className="fa-solid fa-triangle-exclamation me-2" />{message}
                      <i type="button" className="btn-close ms-auto" style={{ fontSize: "10px" }} data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></i></div>}
                    {/* Form */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signupModalFormSignupEmail">Email</label>
                      <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control form-control-lg"
                        name="email"
                        id="signupModalFormSignupEmail"
                        placeholder="Introduzca su email..."
                        aria-label="email@site.com"
                        required />
                      <span className="invalid-feedback">Por favor, introduzca una dirección de correo electrónico válida.</span>
                    </div>
                    {/* End Form */}

                    {/* Form */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signupModalFormSignupPassword">Contraseña</label>
                      <div className="input-group input-group-merge">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="js-toggle-password form-control form-control-lg"
                          name="password"
                          id="signupModalFormSignupPassword"
                          placeholder="Contraseña... (mín. 8 caracteres)"
                          aria-label="8+ characters required"
                          required
                        />
                        <a
                          className="js-toggle-password-target-1 input-group-append input-group-text"
                          href="javascript:;"
                          onClick={() => setShowPassword(!showPassword)} // Cambia el estado al hacer clic
                        >
                          <i className={`js-toggle-passowrd-show-icon-1 bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                        </a>
                      </div>
                      <span className="invalid-feedback">Su contraseña no vale. Por favor, inténtelo de nuevo.</span>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="signupModalFormSignupConfirmPassword">Repetir Contraseña</label>
                      <div className="input-group input-group-merge">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="js-toggle-password form-control form-control-lg"
                          name="confirmPassword"
                          id="signupModalFormSignupConfirmPassword"
                          placeholder="Contraseña... (mín. 8 caracteres)"
                          aria-label="8+ characters required"
                          required
                        />
                        <a
                          className="js-toggle-password-target-2 input-group-append input-group-text"
                          href="javascript:;"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                        >
                          <i className={`js-toggle-passowrd-show-icon-2 bi ${showConfirmPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                        </a>
                      </div>
                      <span className="invalid-feedback">Las contraseñas no coinciden.</span>
                    </div>
                    {/* End Form */}

                    {/* Check */}
                    <div className="form-check mb-5">
                      <input type="checkbox" className="form-check-input" id="signupHeroFormPrivacyCheck" name="signupFormPrivacyCheck" required />
                      <label className="form-check-label" htmlFor="signupHeroFormPrivacyCheck"> Acepto la <a href="https://policies.google.com/privacy?hl=en-US" target="_blank" style={{ color: '#7c488f' }}>política de privacidad </a>y los <a href="https://policies.google.com/terms?hl=es" target="_blank" style={{ color: '#7c488f' }}>términos de uso.</a></label>
                      <span className="invalid-feedback">Por favor, acepte nuestra Política de Privacidad.</span>
                    </div>
                    {/* End Check */}

                    <div className="d-grid mb-3">
                      <button type="submit" className="btn btn-lg" style={{ backgroundColor: '#7c488f', color: 'white' }}>Crear cuenta</button>
                    </div>

                    <div className="text-center">
                    <h5 style={{ fontWeight: '400' }}>¿Ya tienes cuenta en YAY? <Link to="/login" style={{ color: '#7c488f' }}>Inicia Sesión</Link></h5>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    </>
  )
}