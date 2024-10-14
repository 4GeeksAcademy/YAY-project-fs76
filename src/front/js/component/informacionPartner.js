import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import GetUserImages from "./getUserImagens";
import GetUserPerfilImage from "./getUserPerfilImage";
import UserInterest from "./userInterest";

const InformacionPartner = () => {
    const { store, actions } = useContext(Context);
    const { userId } = useParams();
    const [profile, setProfile] = useState({
        selectedInterests: [],
        fullName: { firstName: '', lastName: '' },
        email: '',
        phone: '',
        gender: '',
        bio: '',
        phoneType: '',
    });
    const [editMode, setEditMode] = useState(false);

    const handleInterestSelect = (selectedInterests) => {
        setProfile((prevProfile) => ({ ...prevProfile, selectedInterests }));
        localStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));
    };

    const toggleEditMode = () => setEditMode(!editMode);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleNameChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            fullName: {
                ...prevProfile.fullName,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Llamar a la acción para guardar cambios en el perfil
        actions.updateProfile(userId, profile)
            .then(() => {
                toggleEditMode();
            })
            .catch((error) => {
                console.error("Error al actualizar el perfil:", error);
            });
    };

    useEffect(() => {
        const idToUse = userId || localStorage.getItem("userId") || store.user_id;

        if (idToUse) {
            actions.getProfile(idToUse)
                .then((data) => {
                    if (data) {
                        setProfile(data);

                        const storedInterests = localStorage.getItem('selectedInterests');
                        if (storedInterests) {
                            setProfile((prevProfile) => ({ ...prevProfile, selectedInterests: JSON.parse(storedInterests) }));
                        }
                    } else {
                        console.error("No se pudo obtener el perfil");
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener el perfil:", error);
                });
        } else {
            console.error("No se proporcionó userId");
        }
    }, [userId, store.user_id]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <GetUserPerfilImage />
                                <h2 className="mt-2">
                                    {profile.fullName.firstName} {profile.fullName.lastName}
                                </h2>
                                <p>{profile.email}</p>
                            </div>
                            {!editMode ? (
                                <div>
                                    <p><strong>Teléfono:</strong> {profile.phone}</p>
                                    <p><strong>Género:</strong> {profile.gender}</p>
                                    <p><strong>Bio:</strong> {profile.bio}</p>
                                    {profile.selectedInterests && (
                                        <p>Mis intereses: {profile.selectedInterests.join(', ')}</p>
                                    )}
                                    <button className="btn btn-primary" onClick={toggleEditMode}>
                                        Editar perfil
                                    </button>
                                    <Link to={`/editProfile/${userId}`}>
                                        <button className="btn btn-secondary mt-3">Editar otros detalles</button>
                                    </Link>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3 text-center">
                                        <button className="btn btn-secondary mb-2" type="button">
                                            Subir Foto
                                        </button>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre completo</label>
                                        <div className="row">
                                            <div className="col">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="firstName"
                                                    value={profile.fullName.firstName}
                                                    onChange={handleNameChange}
                                                />
                                            </div>
                                            <div className="col">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="lastName"
                                                    value={profile.fullName.lastName}
                                                    onChange={handleNameChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Correo electrónico</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={profile.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Teléfono</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={profile.phone}
                                            onChange={handleInputChange}
                                        />
                                        <select
                                            className="form-select mt-2"
                                            name="phoneType"
                                            value={profile.phoneType}
                                            onChange={handleInputChange}
                                        >
                                            <option value="Mobile">Móvil</option>
                                            <option value="Home">Casa</option>
                                            <option value="Work">Trabajo</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Género</label>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gender"
                                                    value="Male"
                                                    checked={profile.gender === "Male"}
                                                    onChange={handleInputChange}
                                                />
                                                <label className="form-check-label">Hombre</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gender"
                                                    value="Female"
                                                    checked={profile.gender === "Female"}
                                                    onChange={handleInputChange}
                                                />
                                                <label className="form-check-label">Mujer</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gender"
                                                    value="Other"
                                                    checked={profile.gender === "Other"}
                                                    onChange={handleInputChange}
                                                />
                                                <label className="form-check-label">Otro</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Bio</label>
                                        <textarea
                                            className="form-control"
                                            name="bio"
                                            value={profile.bio}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-success">
                                            Guardar cambios
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={toggleEditMode}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            )}
                            <GetUserImages userId={userId || localStorage.getItem("userId") || store.user_id} />
                            <UserInterest />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InformacionPartner;
