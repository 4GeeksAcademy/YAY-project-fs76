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
      <div className="d-flex justify-content-center align-items-center" style={{ height: '75vh'}}>
        <h1 className="text-center" style={{ fontSize: '100px', color: '#7c488f' }}>Bienvenido/a a <b>YAY</b></h1>
      </div>
		</>
	);
};
