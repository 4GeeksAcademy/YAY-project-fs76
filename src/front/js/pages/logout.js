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
        window.location.reload();
        actions.logout()
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
      <div className="container text-center mx-auto shadow" style={{
        backgroundColor: "#f3f3f3",
        padding: '20px',
        margin: '20px',
        padding: '100px',
        borderRadius: '15px',
      }}>
        <div className="row align-items-start mt-5">
          <div className="col">

          </div>
          <div className="col-10">
            <h1 className="display-4">¡Nos vemos pronto!</h1>
            <h2 className="text-black">Cerrando sesión...</h2>
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