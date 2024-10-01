import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Partner_Signup } from "../component/partner_signup";

import "../../styles/home.css";


export const Partners = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center my-5">
			<h1>PARTNERS</h1>
            <Partner_Signup />
		</div>
	);
};
