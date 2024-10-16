import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Entidades } from "./component/entidades";
import { Navbar_Prev } from "./component/navbar_prev";
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
import { Logout } from "./pages/logout";
import { Mapa } from "./component/mapa";
import { NotFound } from "./pages/notFound";
import Dashboard from "./component/dashboard";
import CompletarDatosUsuario from "./component/completarDatosUsuario";
import ImageUpload from "./component/imageUpload";
import ProfilePicture from "./component/profilePicture";
import Profile from "./component/profile";
import PartnerProfile from "./component/partnerProfile";
import EditPartnerProfile from "./component/editPartnerProfile";
import EditProfile from "./component/editProfile";
import { UserInscripciones } from "./component/userInscripciones";
import { EventosMapa } from "./component/eventosMapa";
import { EventosPublicos } from "./component/eventosPublicos";
import { PartnerMisEventos } from "./component/partner_mis_eventos";
import { CheckLoginPartner } from "./component/checkLoginPartner";
import { useAuth } from "./store/authContext";

// ------ DISEÑO ON -------
import { Landing_Page } from "./pages/landing_page";
import { Navbar } from "./component/designON/navbar";
import { Footer } from "./component/designON/footer";
import { Login } from "./component/designON/login";
import { Signup } from "./component/designON/signup";
import { Partner_Signup } from "./component/designON/partner_signup";
import { Forgot_Password } from "./component/designON/forgot_password";
import { SobreNosotros } from "./component/designON/sobreNosotros";
import { Partner_Login } from "./component/designON/partner_login";
import { ScrollToTopButton } from "./component/designON/scrollToTopButton";
import { Perfil_Usuario } from "./component/designON/perfil_usuario";
import { Redirect_Login } from "./pages/redirect-login";
import { Redirect_Partner } from "./pages/redirect-partner";
import { Partner_Perfil } from "./component/designON/partner_perfil";



function Layout() {

    const basename = process.env.BASENAME || "";
    const { token } = useAuth(); // Obtén el token del contexto

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/home" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Intereses />} path="/interes" />
                        <Route element={<Eventos />} path="/eventos" />
                        <Route element={<UserInterest />} path="/userInterest" />
                        <Route element={<Evento_Card />} path="/evento/:theid" />
                        <Route element={<Evento_Form />} path="/formulario-evento" />
                        <Route element={<Evento_Form />} path="/formulario-evento/:theid" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Entidades />} path="/entidades" />
                        <Route element={<Partners />} path="/partners" />
                        <Route element={<Partner_Completar />} path="/partner_completar_perfil/:theid" />
                        <Route element={<Partners_Home />} path="/partners-home" />
                        <Route element={<Partner_Login />} path="/partners-login" />
                        <Route element={<Partner_Signup />} path="/partners-signup" />
                        <Route element={<Partner_Eventos />} path="/partners-eventos" />
                        <Route element={<Partner_Evento_Card />} path="/partner-evento/:theid" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Forgot_Password />} path="/forgot-password" />
                        <Route element={<Logout />} path="/logout" />
                        <Route element={<Mapa />} path="/mapa" />
                        <Route element={<EventosMapa />} path="/eventos-mapa/:theid" />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/completardatos/:userId" element={<CompletarDatosUsuario />} />
                        <Route path="/imageUpload" element={<ImageUpload />} />
                        <Route path="/profilePicture" element={<ProfilePicture />} />
                        <Route element={<Perfil_Usuario />} path="/editProfile/:userId" />
                        <Route path="/editPartnerProfile/:partnerId" element={<EditPartnerProfile />} />
                        <Route path="/inscripciones/:userId" element={<UserInscripciones />} />
                        <Route path="/partner-profile2/:partnerId" element={<PartnerProfile />} />
                        <Route path="/check-login" element={<CheckLoginPartner />} />
                        <Route element={<SobreNosotros />} path="/sobre-nosotros" />
                        <Route element={<EventosPublicos />} path="/eventos-yay" />
                        <Route element={<NotFound />} path="*" />
                        <Route element={<NotFound />} path="/notFound" />
                        <Route path="/partner-mis-eventos/:partnerId" element={<PartnerMisEventos />} />
                        <Route element={<Landing_Page />} path="/" />
                        <Route element={<Redirect_Login />} path="/redirect-login" />
                        <Route element={<Redirect_Partner />} path="/redirect-partner" />
                        <Route element={<Partner_Perfil />} path="/partner-profile/:partnerId" />

                    </Routes>
                    
            <ScrollToTopButton />
            <div style={{paddingBottom: '100px' }}></div>
                    <Footer token={token} />
         
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
}

export default injectContext(Layout);
