import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

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