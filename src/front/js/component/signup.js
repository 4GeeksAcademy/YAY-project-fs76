// Signup.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; 

export const Signup = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await actions.signup(email, password);
        if (response && response.user_id) {
            alert("Usuario registrado exitosamente");
            console.log("ID del usuario registrado:", response.user_id);
            // Redirigir a la página para completar datos, incluyendo user_id en la URL
            navigate(`/completardatos/${response.user_id}`); 
        } else {
            alert("Error en el registro, revisa los datos");
        }
    };

    return (
        <div className="signup-container">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};
