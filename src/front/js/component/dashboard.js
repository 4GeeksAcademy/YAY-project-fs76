import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Navigate } from 'react-router-dom';
import { Eventos } from './eventos';

const Dashboard = () => {
    const { store } = useContext(Context);

    // Si no está autenticado, redirige al login
    if (!store.auth) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Eventos />
        </div>
    );
};

export default Dashboard;
