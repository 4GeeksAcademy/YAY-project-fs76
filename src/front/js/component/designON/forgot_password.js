import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import { Navigate } from "react-router-dom";

export const Forgot_Password = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    async function sendData(e) {
        e.preventDefault();
        if (!email) {
            setMessage("Por favor, introduzca un email válido");
            return;
        }
        const userExists = await actions.checkUserExists(email);
        const partnerExists = await actions.checkPartnerExists(email);
        console.log('email introducido:', email)

        if (!userExists && !partnerExists) {
            setMessage("El correo electrónico no existe en Yay.");
            return;
        }
        setMessage("Se han enviado los pasos para restablecer la contraseña a la dirección de correo electrónico  proporcionada.");
        setEmail("");
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendData(e);
        }
    };

    return (
        <>
            <div className="d-flex align-items-center min-h-100 fondo-sigin">
                <main id="content" role="main" className="flex-grow-1">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-5 col-xl-4 d-none d-lg-flex justify-content-center align-items-center min-vh-lg-100 position-relative bg-dark" style={{ backgroundImage: 'url(https://htmlstream.com/preview/front-v4.3.1/assets/svg/components/wave-pattern-light.svg)', zIndex: '-1' }}>
                                <div className="flex-grow-1 p-5">
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

                                    <div className="position-absolute start-0 end-0 bottom-0 text-center p-5">
                                        <div className="row justify-content-center">
                                            <div className="col text-center py-3">
                                                <img className="avatar avatar-lg avatar-4x3 signin4" src="https://clipart-library.com/images/dc4LABqni.png" alt="Logo" />
                                            </div>

                                            <div className="col text-center py-3">
                                                <img className="avatar avatar-lg avatar-4x3 signin4" src="https://www.caixabank.com/deployedfiles/caixabank_com/Estaticos/Imagenes/infografias/logoCaixa.png" alt="Logo" />
                                            </div>

                                            <div className="col text-center py-3">
                                                <img className="avatar avatar-lg avatar-4x3 signin4 iberia" src="https://www.totalisimo.com/wp-content/uploads/2023/03/iberia-logo-1.png" alt="Logo" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 col-xl-8 d-flex justify-content-center align-items-center min-vh-lg-100">
                                <div className="flex-grow-1 mx-auto" style={{ maxWidth: '28rem' }}>

                                    <div className="text-center mb-5 mb-md-7 loginTitle">
                                        <h1>
                                            <span className="text text-highlight-warning" style={{ color: 'black' }}>
                                                ¿Olvidaste tu contraseña?
                                            </span>
                                        </h1>
                                        <h5>Introduce tu dirección de correo electrónico y te enviaremos los pasos a seguir para reestablecerla</h5>
                                    </div>
                                    <form className="js-validate needs-validation" noValidate onSubmit={sendData} onKeyDown={handleKeyDown}>
                                        {message && <div className="alert alert-warning d-flex align-items-center mx-2"><i className="fa-solid fa-triangle-exclamation me-2" />{message}
                                            <i type="button" className="btn-close ms-auto" style={{ fontSize: "10px" }} data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></i></div>}
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <label className="form-label" htmlFor="signupModalFormSignupPassword">Contraseña</label>
                                                <Link to={-1}><span className="form-label-link" style={{ color: '#7c488f', fontWeight: '500' }}> <i className="fa-solid fa-chevron-left small me-1"></i>Volver al inicio de sesión</span></Link>
                                            </div>
                                            <input
                                                type="email"
                                                className="form-control form-control-lg"
                                                name="email"
                                                id="signupModalFormSignupEmail"
                                                placeholder="Introduzca su email..."
                                                aria-label="email@site.com"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <span className="invalid-feedback">Por favor, introduzca una dirección de correo electrónico válida.</span>
                                        </div>
                                        <div className="d-grid mb-3">
                                            <button type="submit" className="btn btn-lg" style={{ backgroundColor: '#7c488f', color: 'white' }}>Enviar</button>
                                        </div>
                                        <div>
                                            <h5 className="ms-3">* Revisa tu bandeja de entrada</h5>
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