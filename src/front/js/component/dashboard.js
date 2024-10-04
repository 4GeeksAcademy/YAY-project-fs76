import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
    const token = sessionStorage.getItem('token');
if (!token) {
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
