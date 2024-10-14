import React from "react";

import { Signup } from "../component/diseñoON/signup";
import { Login } from "../component/login";

import "../../styles/home.css";


export const Usuarios = () => {

    return (
        <>
            <h1 className="text-center mt-5">USUARIOS</h1>
            <hr className="border border-success border-2 opacity-75 w-75 mx-auto"></hr>
            <div className="d-flex justify-content-center text-center">

                <div className="col-3 me-5">
                    <Signup />
                </div>
                <div className="col-3 ms-5">
                    <Login />
                </div>

            </div>

        </>
    )
};