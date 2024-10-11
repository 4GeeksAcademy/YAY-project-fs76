import React, { useState, useEffect } from 'react';

const DisplayImageComponent = ({ actions }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await actions.getPartnerImage();
                setImageUrl(response.foto_perfil);
            } catch (error) {
                setError("Error al obtener la imagen de perfil.");
                console.error(error);
            }
        };

        fetchImage();
    }, [actions]);

    return (
        <div>
            <h2>Imagen de Perfil</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {imageUrl ? (
                <img src={imageUrl} alt="Perfil" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
            ) : (
                <p>No hay imagen de perfil disponible.</p>
            )}
        </div>
    );
};

export default DisplayImageComponent;
