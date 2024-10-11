import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import UploadImageComponent from "./uploadPartnerImage";
import DisplayImageComponent from "./getPartnerImage";

const PartnerProfile = () => {
    console.log(localStorage.getItem("token"))
    const { store, actions } = useContext(Context);
    const { partnerId } = useParams();
    const [profile, setProfile] = useState({
        nombre: '',
        nif: '',
        direccion: '',
        latitud: '',
        longitud: '',
        sector: '',
        entidad_id: '',
    });
    const [direccion, setDireccion] = useState("");
    

    useEffect(() => {
        if (partnerId) {
            actions.getEntidades();
            actions.getPartnerProfile(partnerId)
                .then((data) => {
                    if (data) {
                        setProfile(data); // Establece el perfil en el estado local
                        setDireccion(data.direccion); // Establece la dirección en el estado local
                    } else {
                        console.error("No se pudo obtener el perfil");
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener el perfil:", error);
                });
        } else {
            console.error("No se proporcionó partnerId");
        }
    }, [partnerId]);

    return (
        <div className="m-5">
 <div className="d-flex justify-content-around">
            <h2>Perfil del partner</h2>
            <Link to="/partners-eventos">
                    <button className="btn" style={{ backgroundColor: '#A7D0CD', color: '#494949' }} onFocus={(e) => e.target.blur()}>Lista de Eventos</button>
                </Link>
                </div>
            {profile.nombre ? (
                <> 
                    <div className="d-flex flex-row m-5 justify-content-between">
                        <div className="m-5">
                            <p><strong>Nombre:</strong> {profile.nombre}</p>
                            <p><strong>NIF o DNI:</strong> {profile.nif}</p>
                            <p><strong>Direccion:</strong> {profile.direccion}</p>
                            <p><strong>Sector:</strong> {profile.sector}</p>
                            <p><strong>Entidad ID:</strong> {profile.entidad_id}</p>
                            <Link to={`/editPartnerProfile/${partnerId}`}>
                                <button>Editar perfil</button>
                            </Link>
                        </div>
                        <div className="m-5">
                        <UploadImageComponent actions={actions} />
                        <DisplayImageComponent actions={actions} />
                        </div>
                    </div>
                </>
            ) : (
                <p>Cargando perfil...</p>
            )}
        </div>
    );
};

export default PartnerProfile;
