import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

export const Partner_Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState(null);
    const formRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false); 

    function sendData(e) {
        e.preventDefault();
        if (!email || !password) {
            setMessage("Por favor, rellene todos los campos");
            return;
        }
        if (password.length < 8) {
            setMessage("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        actions.loginPartner(email, password);
        setTimeout(() => {
            if (!store.auth) {
                setMessage("Email y/o contraseña incorrectos");
            }
        }, 2000); 
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendData(e); 
        }
    };

    return (
        <>
            {store.auth === true ? <Navigate to="/partners_home" /> :
                <form className="container h-100 d-flex flex-column align-items-end my-5" onSubmit={sendData} ref={formRef} onKeyDown={handleKeyDown}>
                    <div className="card p-5">
                        <h1 className="login  mb-4">Inicia sesión como Partner</h1>
                        {message && <div className="alert alert-warning d-flex align-items-center mx-2"><i className="fa-solid fa-triangle-exclamation me-2" />{message}
                            <i type="button" className="btn-close float-end ms-1" style={{fontSize: "10px"}} data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></i>
                        </div>}
                        <div className="inputBox my-2 mb-4" style={{ position: "relative", textAlign: "left" }}>
                            <span className="user" style={{ position: "absolute", top: "-25px", left: "5px", fontSize: "20px", color: "#666" }}>Email</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required= "required"
                                style={{ width: "100%" }} // Hacer el input más largo
                            />
                        </div>
    
                        <div className="inputBox my-2 mb-4" style={{ position: "relative", textAlign: "left" }}>
                            <span style={{ position: "absolute", top: "-25px", left: "5px", fontSize: "20px", color: "#666" }}>Contraseña</span>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                required="required" 
                                style={{ width: "100%" }} // Hacer el input más largo
                            />
                            <i
                                className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: "pointer", position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)" }} // Ajustar la posición del ícono
                            ></i>
                        </div>


                        <button type="submit" className="enter btn btn-success mx-auto my-4" style={{ marginBottom: '5px' }}>YAY</button>
                        <p>¿Es su primera vez aquí? <Link to="/partner_signup">Regístrese</Link></p>

                    </div>
                </form>
            }
        </>
    );
};