import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const NotFound = () => {

    const navigate = useNavigate();


    return (
        <>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url("https://cdn.dribbble.com/users/4194651/screenshots/7384705/media/062a6c7c0ec96679de621466ab9307e8.gif")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                zIndex: -1
            }}></div>
            <div className="container text-center">
                <div className="row align-items-start mt-5">
                    <div className="col">

                    </div>
                    <div className="col-10">
                        <h2 className="display-6 mb-4"><b>Ups!Aquí no era</b></h2>
                        <Link to="/interes">
                            <button className="btn btn-success me-3 mb-4">Volver a casa</button>
                        </Link>
                    </div>
                    <div className="col">

                    </div>
                </div>
            </div>
        </>
    );
};