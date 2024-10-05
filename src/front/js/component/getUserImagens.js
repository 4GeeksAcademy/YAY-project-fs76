import React, { useEffect, useState } from "react";
import { Usuarios } from "../pages/usuarios";

const GetUserImages = ({ userId }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/fotos/${userId}`);
                if (!response.ok) throw new Error("Error al obtener imágenes");
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error("Error al obtener imágenes:", error);
            }
        };

        if (userId) {
            fetchImages();
        }
    }, [userId]);

    return (
        <div>
            <h3>Imágenes del usuario</h3>
            {images.length > 0 ? (
                images.map((image) => (
                    <img key={image.id} src={image.url} alt="Imagen de usuario" />
                ))
            ) : (
                <p>No hay imágenes disponibles.</p>
            )}
        </div>
    );
};

export default GetUserImages;
