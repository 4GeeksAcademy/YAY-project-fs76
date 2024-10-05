import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext'; // Importar el contexto de Flux

const ImageUpload = () => {
    const [file, setFile] = useState(null); // Para el archivo seleccionado
    const [imageUrl, setImageUrl] = useState(""); // Para almacenar la URL de la imagen subida
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

    const handleUpload = () => {
        if (file) {
            setLoading(true); // Iniciar carga
            actions.uploadImage(file)
                .then((data) => {
                    setImageUrl(data.url); // Almacenar la URL de la imagen devuelta por el servidor
                    setLoading(false); // Finalizar carga
                })
                .catch((error) => {
                    setError("Hubo un problema al subir la imagen.");
                    setLoading(false); // Finalizar carga en caso de error
                });
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Subir Imagen</button>

            {/* Mostrar errores si los hay */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Mostrar la imagen subida si existe una URL */}
            {loading ? (
                <p>Cargando imagen...</p>
            ) : (
                imageUrl && <img src={imageUrl} alt="Imagen subida" style={{ marginTop: '20px', maxWidth: '100%' }} key={imageUrl} />
            )}
        </div>
    );
};

export default ImageUpload;
