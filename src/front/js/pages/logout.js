import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

import "../../styles/loading.css";

export const Logout = () => {
  const { store, actions } = useContext(Context);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.from) {
      const redirectTimeout = setTimeout(() => {
        setRedirect(true);
      }, 3000);

      return () => clearTimeout(redirectTimeout);
    } else {
      navigate("/", { replace: true });
    }
  }, [location]);

  return (
    <>
      {redirect ? <Navigate to="/" /> : null}
      <div style={{
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			backgroundColor: '#de8f79',
			zIndex: -1
		}}></div>
      <div className="container text-center">
        <div className="row align-items-start mt-5">
          <div className="col">

          </div>
          <div className="col-10">
            <h2 className="display-6">¡Nos vemos pronto!</h2>
            <h5>Cerrando sesión...</h5>
            <br></br>
            <div className="loader mx-auto "></div>
          </div>
          <div className="col">

          </div>
        </div>
      </div>
    </>
  );
};