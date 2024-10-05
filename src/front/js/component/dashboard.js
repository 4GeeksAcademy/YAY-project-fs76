import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
    const { store } = useContext(Context);

    // Si no está autenticado, redirige al login
    if (!store.auth) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {/* Contenido del dashboard */}
        </div>
    );
};

export default Dashboard;
