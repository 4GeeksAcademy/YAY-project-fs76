import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Inicializamos el contexto
export const Context = React.createContext(null);

// Esta función inyecta el store global en cualquier componente donde quieras usarlo.
const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        // Se inicializa el estado usando la función getState
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: updatedStore =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions }
                    })
            })
        );

        // Este useEffect corre una sola vez cuando la aplicación se carga
        useEffect(() => {
            // Comprobamos si el token y el user_id están en localStorage
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("user_id");

            if (token && userId) {
                // Si existen, actualizamos el store para indicar que el usuario está autenticado
                state.actions.setAuthState({
                    auth: true,
                    token: token,
                    user_id: userId
                });
                console.log("Usuario autenticado automáticamente al cargar la aplicación.");
            }

            // Llamada a una acción de ejemplo, puedes eliminarla o reemplazarla por otra acción que necesites
            state.actions.getMessage(); 

        }, []);

        // El valor inicial para el contexto ahora es el estado actual de este componente
        // con getStore, getActions y setStore disponibles en todo el árbol de componentes
        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };

    return StoreWrapper;
};

export default injectContext;
