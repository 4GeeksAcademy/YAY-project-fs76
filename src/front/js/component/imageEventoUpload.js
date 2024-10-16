import React, { useState, useContext, useRef } from 'react';
import { Context } from '../store/appContext'; // Importar el contexto de Flux

export const ImageEventoUpload = ({ fetchEventoImage, eventoId, onUploadComplete }) => { // `fetchEventoImage` se pasa como prop
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { actions } = useContext(Context);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);
            setError(null);
        } else {
            setError("Por favor, selecciona un archivo de imagen válido.");
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault(); // Asegurar que no se envíe el formulario
        if (file) {
            setLoading(true);
            try {
                const url = await actions.uploadEventoImage(eventoId, file); // Supongamos que retorna la URL
                fetchEventoImage();
                onUploadComplete(url); // Pasar la URL de la imagen al componente padre
                setFile(null);
            } catch (error) {
                setError("Hubo un problema al subir la imagen del evento.");
            } finally {
                setLoading(false);
            }
        } else {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="card p-4">
            <div className="card-body">
                <h5 className="card-title text-center mb-4">Subir Imagen de Evento</h5>
                
                <input 
                    type="file" 
                    className="d-none" // Ocultar el input de archivo
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                />
                
                <div className="mb-3 text-center">
                    <button 
                        className={`btn text-white btn-sm ${loading ? "disabled" : ""}`}
                        style={{ backgroundColor: '#7c488f'}}
                        onClick={handleUpload} 
                        disabled={loading}
                    >
                        {loading ? (
                            "Subiendo..."
                        ) : (
                            file ? "Aceptar" : "Elegir Imagen"
                        )}
                    </button>
                </div>

                {error && <p className="text-danger text-center">{error}</p>}
            </div>
        </div>
    );
};
