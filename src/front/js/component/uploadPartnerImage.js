import React, { useState } from 'react';

const UploadImageComponent = ({ actions }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setError("Por favor, selecciona una imagen.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await actions.uploadPartnerImage(selectedFile);
            console.log("Imagen subida con éxito", response);
            // Aquí podrías agregar una función para actualizar la imagen mostrada
        } catch (error) {
            setError("Error al subir la imagen.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Subir Imagen de Perfil</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept="image/*" />
                <button type="submit" disabled={loading}>
                    {loading ? "Subiendo..." : "Subir Imagen"}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default UploadImageComponent;
