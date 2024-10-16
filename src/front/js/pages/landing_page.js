import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/landingPage.css";

import { Landing_Header } from "../component/designON/landing_header";
import { Landing_Card } from "../component/designON/landing_card";
import { Landing_About } from "../component/designON/landing_about";
import { Landing_Cifras } from "../component/designON/landing_cifras";
import { Landing_Maps } from "../component/designON/landing_maps";
import { Landing_Form } from "../component/designON/landing_form";
import { Landing_Partner } from "../component/designON/landing_partner";
import { ScrollToTopButton } from "../component/designON/scrollToTopButton";


export const Landing_Page = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation();


    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);


    return (
        <>
            <section id="land-header">
                <Landing_Header />
            </section>

            <section id="land-eventos">
                <Landing_Card />
            </section>

            <section id="land-about">
                <Landing_About />
            </section>

            <section id="land-cifras">
                <Landing_Cifras />
            </section>

            <section id="land-mapa">
                <Landing_Maps />
            </section>

            <section id="land-contacto">
                <Landing_Form />
            </section>

            <section id="land-partner">
                <Landing_Partner />
            </section>

            <ScrollToTopButton />
        </>
    );
};