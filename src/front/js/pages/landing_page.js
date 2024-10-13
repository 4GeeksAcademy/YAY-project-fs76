import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/landingPage.css";

import { Landing_Header } from "../component/diseñoON/landing_header";
import { Landing_Card } from "../component/diseñoON/landing_card";
import { Landing_About } from "../component/diseñoON/landing_about";
import { Landing_Cifras } from "../component/diseñoON/landing_cifras";
import { Landing_Maps } from "../component/diseñoON/landing_maps";


export const Landing_Page = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <Landing_Header />
            <Landing_Card />
            <Landing_About />
            <Landing_Cifras />
            <Landing_Maps />

        </>
    );
};