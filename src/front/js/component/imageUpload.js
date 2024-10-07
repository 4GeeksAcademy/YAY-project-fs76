import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext'; // Importar el contexto de Flux

const ImageUpload = ({ fetchImages }) => { // Recibimos fetchImages como prop
    const [file, setFile] = useState(null); // Para el archivo seleccionado
    const [error, setError] = useState(null); // Para manejar errores
    const [loading, setLoading] = useState(false); // Para manejar el estado de carga
    const { actions } = useContext(Context); // Acceder a las acciones de Flux

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
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Subiendo..." : "Subir Imagen"}
            </button>

            {/* Mostrar errores si los hay */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ImageUpload;
