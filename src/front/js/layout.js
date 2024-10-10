import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Entidades } from "./component/entidades";
import { Navbar } from "./component/navbar";
import { Intereses } from "./component/intereses";
import { Eventos } from "./component/eventos";
import { Evento_Card } from "./component/evento_card";
import { Evento_Form } from "./component/evento_form";
import { Partners } from "./pages/partners";
import { Partner_Completar } from "./component/partner_completar";
import { Partners_Home } from "./pages/partners_home";
import { Partner_Eventos } from "./component/partner_eventos";
import { Partner_Evento_Card } from "./component/partner_evento_card";
import UserInterest from "./component/userInterest";
import { Usuarios } from "./pages/usuarios";
import { Logout } from "./pages/logout";
import { Footer } from "./component/footer";
import { Login } from "./component/login";
import { MapaUsuario } from "./component/mapaUsuario";
import { NotFound } from "./pages/notFound";
import Dashboard from "./component/dashboard";
import CompletarDatosUsuario from "./component/completarDatosUsuario";
import ImageUpload from "./component/imageUpload";
import ProfilePicture from "./component/profilePicture";
import Profile from "./component/profile";
import PartnerProfile from "./component/parnetProfile";
import EditPartnerProfile from "./component/editPartnerProfile";
import EditProfile from "./component/editProfile";
import { UserInscripciones } from "./component/userInscripciones";

function Layout() {
 
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Intereses />} path="/interes" />
                        <Route element={<Eventos />} path="/eventos" />
                        <Route element={<UserInterest/>} path="/userInterest" />
                        <Route element={<Evento_Card />} path="/evento/:theid" />
                        <Route element={<Evento_Form />} path="/formulario-evento" />
                        <Route element={<Evento_Form />} path="/formulario-evento/:theid" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Entidades />} path="/entidades" />
                        <Route element={<Partners />} path="/partners" />
                        <Route element={<Partner_Completar />} path="/partner_completar_perfil/:theid" />
                        <Route element={<Partners_Home />} path="/partners_home" />
                        <Route element={<Partner_Eventos />} path="/partners-eventos" />
                        <Route element={<Partner_Evento_Card />} path="/partner-evento/:theid" />
                        <Route element={<Usuarios />} path="/usuarios" />
                        <Route element={<Logout />} path="/logout" />
                        <Route element={<MapaUsuario />} path="/mapa" />
                        <Route element={<NotFound />} path="*"/>
                        <Route element={<NotFound />} path="/notFound"/>
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/completardatos/:userId" element={<CompletarDatosUsuario />} />
                        <Route path="/imageUpload" element={<ImageUpload />} />
                        <Route path="/editProfile" element={<EditProfile />} />
                        <Route path="/profilePicture" element={<ProfilePicture />} />
                        <Route path="/profile/:userId" element={<Profile />} />
                        <Route path="/editProfile/:userId" element={<EditProfile />} />
                        <Route path="/editPartnerProfile/:partnerId" element={<EditPartnerProfile/>} />
                        <Route path="/inscripciones/:userId" element={<UserInscripciones />} />
                        <Route path="/partner-profile/:partnerId" element={<PartnerProfile />} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
}

export default injectContext(Layout);
