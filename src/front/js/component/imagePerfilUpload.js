import React, { useState, useContext, useRef } from 'react';
import { Context } from '../store/appContext'; // Importar el contexto de Flux

const ImageUploadPerfil = ({ fetchPerfilImage }) => { // Recibimos fetchPerfilImage como prop
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
                await actions.uploadPerfilImage(file); // Subir la imagen de perfil
                fetchPerfilImage(); // Refrescar la imagen de perfil después de subir
                setFile(null); // Limpiar el archivo seleccionado
            } catch (error) {
                setError("Hubo un problema al subir la imagen de perfil.");
            } finally {
                setLoading(false); // Finalizar carga
            }
        } else {
            // Si no hay archivo, abrir el selector de archivos
            fileInputRef.current.click();
        }
    };

    return (
        <div className="card p-4">
            <div className="card-body">
                <h5 className="card-title text-center mb-4">Subir Imagen de Perfil</h5>
                
                <input 
                    type="file" 
                    className="d-none" // Ocultar el input de archivo
                    ref={fileInputRef} // Usar la referencia
                    onChange={handleFileChange} 
                    accept="image/*" // Solo permitir imágenes
                />
                
                <div className="mb-3 text-center">
                    <button 
                        className={`btn text-white btn-sm ${loading ? "disabled" : ""}`}
                        style={{ backgroundColor: file ? 'green' : '#7c488f' }}
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

                {/* Mostrar errores si los hay */}
                {error && <p className="text-danger text-center">{error}</p>}
            </div>
        </div>
    );
};

export default ImageUploadPerfil;
