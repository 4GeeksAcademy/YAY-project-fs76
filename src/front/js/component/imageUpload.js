import React, { useState, useContext, useRef } from 'react';
import { Context } from '../store/appContext'; // Importar el contexto de Flux
import "../../styles/imagenes.css";

const ImageUpload = ({ fetchImages }) => {
    const [file, setFile] = useState(null); // Para el archivo seleccionado
    const [error, setError] = useState(null); // Para manejar errores
    const [loading, setLoading] = useState(false); // Para manejar el estado de carga
    const { actions } = useContext(Context); // Acceder a las acciones de Flux
    const fileInputRef = useRef(null); // Referencia para el input de archivo

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);
            setError(null); // Limpiar errores previos
        } else {
            setError("Por favor, selecciona un archivo de imagen válido.");
        }
    };

    const handleUpload = async () => {
        if (file) {
            setLoading(true); // Iniciar carga
            try {
                await actions.uploadImage(file); // Subir la imagen
                fetchImages(); // Refrescar las imágenes después de subir
                setFile(null); // Limpiar el archivo seleccionado
            } catch (error) {
                setError("Hubo un problema al subir la imagen.");
            } finally {
                setLoading(false); // Finalizar carga
            }
        } else {
            // Si no hay archivo, abrir el selector de archivos
            fileInputRef.current.click();
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Subir Imagen</h5>
                    
                    <input
                        type="file"
                        className="d-none"
                        ref={fileInputRef} // Usar la referencia
                        onChange={handleFileChange}
                        accept="image/*" // Solo permitir imágenes
                    />

                    <button
                        onClick={handleUpload}
                        className={`btn btn-primary btn-sm ${loading ? "disabled" : ""}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
                                Subiendo...
                            </>
                        ) : (
                            file ? "Subir Imagen" : "Elegir Imagen"
                        )}
                    </button>

                    {/* Mostrar errores si los hay */}
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
