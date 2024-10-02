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
import { Usuarios } from "./pages/usuarios";
import { Logout } from "./pages/logout";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

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
                        <Route element={<Evento_Card />} path="/evento/:theid" />
                        <Route element={<Evento_Form />} path="/formulario-evento" />
                        <Route element={<Evento_Form />} path="/formulario-evento/:theid" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Entidades />} path="/entidades" />
                        <Route element={<Partners />} path="/partners" />
                        <Route element={<Partner_Completar />} path="/partner_completar_perfil/:theid" />
                        <Route element={<Partners_Home />} path="/partners_home" />
                        <Route element={<Usuarios />} path="/usuarios" />
                        <Route element={<Logout />} path="/logout" />
                        <Route element={<h1>Not found!</h1>} path="*"/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
