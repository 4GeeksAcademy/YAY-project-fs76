import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const CambiarLetra = () => {
    const [valor, setValor] = useState('o');
    const valores = ['a', 'o'];
    let indice = 0;

    useEffect(() => {
        const interval = setInterval(() => {
            setValor(valores[indice]);
            indice = (indice + 1) % valores.length;
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    return <h1 style={{ fontSize: '100px', color: '#7c488f' }}>Bienvenid{valor} a <b>YAY</b></h1>;
};



export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <><div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#7c488f',
            zIndex: -1
        }}></div>
            <div className="text-center" style={{ height: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CambiarLetra />
                <h3 style={{ backgroundColor: '#7c488f', color: 'white', letterSpacing: '5px', padding: '5px' }}>HAZ DE TU BARRIO UN HOGAR</h3>
                <img src="https://i.ibb.co/4WsXL7Z/vector-logo.png"  alt="yay-fondo" border="0" className="h-25 mt-2" />
            </div>
        </>
    );
};
