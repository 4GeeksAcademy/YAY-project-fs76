import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import UploadImageComponent from "./uploadPartnerImage";
import DisplayImageComponent from "./getPartnerImage";


const PartnerProfile = () => {
    console.log(localStorage.getItem("token"))
    const { store, actions } = useContext(Context);
    const { partnerId } = useParams();
    const [profile, setProfile] = useState({
        nombre: '',
        nif: '',
        ciudad: '',
        sector: '',
        entidad_id: '',
    });
    
    useEffect(() => {
        const idToUse = partnerId || localStorage.getItem("partnerId") || store.partner_id;
        
        if (idToUse) {
            actions.getPartnerProfile(idToUse)
                .then((data) => {
                    if (data) {
                        setProfile(data);
                    } else {
                        console.error("No se pudo obtener el perfil");
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener el perfil del partner:", error);
                });
        } else {
            console.error("No se proporcionó ID");
        }
    }, [partnerId, store.partner_id]);
    const navigate = useNavigate();

    return (
        <div>
        <div>
            <h2>Perfil del partner</h2>
            {profile.nombre ? (
                <> 
                    <div className="d-flex flex-row">
                        <div>
                            <p><strong>Nombre:</strong> {profile.nombre}</p>
                            <p><strong>NIF:</strong> {profile.nif}</p>
                            <p><strong>Ciudad:</strong> {profile.ciudad}</p>
                            <p><strong>Sector:</strong> {profile.sector}</p>
                            <p><strong>Entidad ID:</strong> {profile.entidad_id}</p>
                            <Link to={`/editPartnerProfile/${partnerId}`}>
                                <button>Editar perfil</button>
                            </Link>
                        </div>
                        <div>
                        <UploadImageComponent actions={actions} />
                        <DisplayImageComponent actions={actions} />
                        </div>
                    </div>
                </>
            ) : (
                <p>Cargando perfil...</p>
            )}
        </div>
        <div>
             {store.auth && store.partner_id && (  // Cambiar partnerId por partner_id
				<button
					className="btn btn-info me-3"
					onClick={() => navigate(`/partner-mis-eventos/${store.partner_id}`)} // Usar partner_id del store
					style={{ backgroundColor: '#A7D0CD' }}
				>
					Mis Eventos
				</button>
			)}
        </div>
        </div>
    );
};

export default PartnerProfile;
