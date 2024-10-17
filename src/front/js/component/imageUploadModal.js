import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const ImageUploadModal = ({ eventoId, onClose }) => {
    const { actions } = useContext(Context);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);
            setError(null);
        } else {
            setError("Por favor, selecciona un archivo de imagen válido.");
        }
    };

    const handleUpload = async () => {
        if (file) {
            setLoading(true);
            try {
                const url = await actions.uploadEventoImage(eventoId, file); // Implementa la acción para subir la imagen
                onClose(url); // Llama a onClose y pasa la URL de la imagen al componente padre
            } catch (error) {
                setError("Hubo un problema al subir la imagen.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Subir Imagen de Evento</h5>
                        <button type="button" className="btn-close" onClick={() => onClose(null)}>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input type="file" onChange={handleFileChange} accept="image/*" />
                        {error && <p className="text-danger">{error}</p>}
                        <div className="text-center mt-3">
                            <button className='btn btn-secondary btn close me-3' onClick={() => onClose(null)}>Más tarde</button>
                            <button 
                                className="btn"
                                onClick={handleUpload}
                                disabled={loading}
                                style={{ backgroundColor: '#7c488f', color: 'white'}}
                            >
                                {loading ? "Subiendo..." : "Subir"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUploadModal;