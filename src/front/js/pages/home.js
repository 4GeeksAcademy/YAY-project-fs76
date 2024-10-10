import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<><div style={{
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			backgroundColor: '#de8f79',
			zIndex: -1
		}}></div>
<div className="text-center" style={{ height: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <h1 style={{ fontSize: '100px', color: '#7c488f' }}>Bienvenido/a a <b>YAY</b></h1>
    <h3 style={{ backgroundColor: '#A7D0CD', color: '#494949', letterSpacing: '5px', padding: '5px' }}>HAZ DE TU BARRIO UN HOGAR</h3>
    <img src="https://i.ibb.co/tbbV6G0/yay-fondo.png" alt="yay-fondo" border="0" className="h-25 mt-2"/>
</div>
		</>
	);
};
