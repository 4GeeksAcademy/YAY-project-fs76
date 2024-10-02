import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Asegúrate de tener acceso al contexto de Flux

export const Signup = () => {
    const { actions } = useContext(Context); // Acceso a las acciones de Flux
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Agregar confirmPassword
    const navigate = useNavigate(); // Para redirigir después de registrarse

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si las contraseñas coinciden
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const success = await actions.signup(email, password);
        if (success) {
            alert("Usuario registrado exitosamente");
            navigate("/completar-datos"); // Redirigir a la página para completar datos
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
                <div>
                    <label>Repetir Contraseña:</label>
                    <input
                        type="password"
                        value={confirmPassword} // Usar el valor de confirmPassword
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

