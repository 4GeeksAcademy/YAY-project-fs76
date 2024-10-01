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
import { Footer } from "./component/footer";
import Signup from "./component/signup";

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
                        <Route element={<h1>Not found!</h1>} path="*"/>
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
