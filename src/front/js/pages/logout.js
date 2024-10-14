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
      <div className="container text-center mx-auto" style={{	backgroundColor: '#de8f79',
      padding: '20px',
      margin: '20px',
      borderRadius: '15px'}}>
        <div className="row align-items-start mt-5">
          <div className="col">

          </div>
          <div className="col-10">
            <h2 className="display-6" style={{ fontWeight: '500' }}>¡Nos vemos pronto!</h2>
            <h4>Cerrando sesión...</h4>
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