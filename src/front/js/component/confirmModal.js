// src/front/js/component/ConfirmModal.js
import React from 'react';

const ConfirmModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h4>Confirmación</h4>
                <p>¿Estás seguro de que quieres eliminar esta imagen?</p>
                <button onClick={onConfirm}>Sí, eliminar</button>
                <button onClick={onCancel}>Cancelar</button>
            </div>
        </div>
    );
};

export default ConfirmModal;
