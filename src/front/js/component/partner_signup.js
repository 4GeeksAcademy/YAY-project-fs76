import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

export const Partner_Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function handleSignup(e) {
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
        actions.checkPartnerExists(email).then(partnerExists => {
            if (partnerExists) {
                setMessage("Ya existe un Partner registrado con este correo electrónico");
                return;
            }
            actions.signupPartner(email, password);
        });
    }

    return (
        <>
            {store.ƒ ? <Navigate to={`/partner_completar_perfil/${store.partnerId}`} /> :
                <form className="container h-100 d-flex flex-column align-items-start my-5" onSubmit={handleSignup}>
                    <div className="card p-5">
                        <h1 className="singup mb-4">Regístrate como Partner</h1>
                        {message && <div className="alert alert-warning d-flex align-items-center mx-2"><i className="fa-solid fa-triangle-exclamation me-2" />{message}
                            <i type="button" className="btn-close float-end ms-1" style={{ fontSize: "10px" }} data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></i></div>}

                        <div className="inputBox my-2 mb-4" style={{ position: "relative", textAlign: "left" }}>
                            <span className="user" style={{ position: "absolute", top: "-25px", left: "5px", fontSize: "20px", color: "#666" }}>Email</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required="required"
                                style={{ width: "100%" }}
                            />
                        </div>

                        <div className="inputBox my-2 mb-4" style={{ position: "relative", textAlign: "left" }}>
                            <span style={{ position: "absolute", top: "-25px", left: "5px", fontSize: "20px", color: "#666" }}>Contraseña</span>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                required="required"
                                style={{ width: "100%" }}
                            />
                            <i
                                className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: "pointer", position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)" }} // Ajustar la posición del ícono
                            ></i>
                        </div>

                        <div className="inputBox my-2" style={{ position: "relative", textAlign: "left" }}>
                            <span style={{ position: "absolute", top: "-25px", left: "5px", fontSize: "20px", color: "#666" }}>Repetir contraseña</span>
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={showConfirmPassword ? "text" : "password"}
                                required="required"
                                style={{ width: "100%" }}
                            />
                            <i
                                className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ cursor: "pointer", position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)" }} // Ajustar la posición del ícono
                            ></i>
                        </div>

                        <button type="submit" className="enter btn btn-success mx-auto my-4" onClick={handleSignup}>Registrarse</button>
                        <p>¿Ya tienes cuenta como partner en YAY? <Link to="/partner-login">Inicia Sesión</Link></p>
                    </div>
                </form>
            }
        </>
    );
};