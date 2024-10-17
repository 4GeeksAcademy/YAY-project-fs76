import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { ImageEventoUpload } from './imageEventoUpload';
import "../../styles/imagenes.css";

export const GetEventoImage = ({ eventoId, setImagenUrl, partnerId }) => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const { actions } = useContext(Context);

    const fetchEventoImage = async () => {
        try {
            const response = await actions.getEventoImage(eventoId);
            console.log(`URL de la imagen para el evento ${eventoId}:`, response.foto_evento);  // Aquí
            setImage(response.foto_evento || null); 
        } catch (error) {
            setError("No se pudo obtener la imagen del evento.");
            console.error("Error al cargar la imagen:", error);
        }
    };
    useEffect(() => {
        fetchEventoImage(); // Cargar la imagen del evento al montar el componente
    }, [eventoId]);

    const handleUploadComplete = (url) => {
        setImage(url);
        setImagenUrl(url); // Almacenar la URL en el estado superior
    };

    const handleDeleteClick = async () => {
        try {
            await actions.deleteEventoImage(eventoId);
            setImage(null); // Limpiar la imagen después de eliminar
            setImagenUrl(null); // Limpiar la URL en el estado superior
        } catch (error) {
            setError("");
        }
    };

    return (
        <div className="evento-image-container m-0 p-0 d-flex align-items-center">
            {error && <p className="error-message">{error}</p>}
            {image ? (
                <div className="image-wrapper m-0 p-0">
                    <img src={image} alt="Imagen del Evento" className="evento-image" />
                    {partnerId && (
                        <button onClick={handleDeleteClick} className="delete-button">X</button>
                    )}
                </div>
            ) : (
                partnerId ? (
                    <ImageEventoUpload fetchEventoImage={fetchEventoImage} eventoId={eventoId} onUploadComplete={handleUploadComplete} />
                ) : (
                    <div style={{maxHeight: '200px'}}>
                    <img src="https://i.ibb.co/RSfPzcJ/defecto-evento.png"  alt="Imagen por defecto" className="evento-image"  />
                    </div>
                )
            )}
        </div>
    );
};