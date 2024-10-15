import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

import "../../styles/loading.css";

export const Redirect_Partner = () => {
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
      navigate("/partners-login", { replace: true });
    }

  }, [location]);

  return (
    <>
      {redirect ? <Navigate to="/partners-login" /> : null}
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
          <h2 className="text-black">Ahora te toca...</h2>
            <h1 className="display-4">Iniciar sesión y empezar en tu aventura en YAY</h1>

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