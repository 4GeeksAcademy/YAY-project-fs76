import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Partner_Signup } from "../component/partner_signup";
import { Partner_Login } from "../component/partner_login";

import "../../styles/home.css";


export const Partners = () => {
	const { store, actions } = useContext(Context);

	return (

<>
			<h1 className ="text-center mt-5">PARTNERS</h1>
			<hr className="border border-success border-2 opacity-75 w-75 mx-auto"></hr>
			<div className="d-flex justify-content-center text-center">

				<div className="col-3 me-5">
					<Partner_Signup />
				</div>
				<div className="col-3 ms-5">
					<Partner_Login />
				</div>
		
		</div>

		</>
	);
};
