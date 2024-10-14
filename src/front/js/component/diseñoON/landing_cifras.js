import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../store/appContext';
import { Link } from 'react-router-dom';

export const Landing_Cifras = () => {
    const { store, actions } = useContext(Context);

    return (

        <div className=" content-space-2 gradiente-cifras content-space-lg-3 my-5 d-flex justify-content-center">
        <div className=" row d-flex justify-content-around">
          <div className="col-sm-3 mb-2 mb-sm-0">
          <div className="text-center">
                        <small className="text-cap fs-5" style={{color: '#de8f79', letterSpacing: '4px'}}>— Usuarios Registrados</small>
                        <h4 className="display-4" style={{color: '#494949'}}>150,000</h4>
                        <h5>Más de 150,000 usuarios mayores de 60 se han registrado en nuestra plataforma.</h5>
                    </div>
                </div>

                <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="text-center">
                    <small className="text-cap fs-5" style={{color: '#de8f79', letterSpacing: '4px'}}>— Satisfacción del Usuario</small>
                        <h4 className="display-4" style={{color: '#494949', }}>95%</h4>
                        <h5>El 95% de nuestros usuarios están satisfechos con los eventos a los que asisten.</h5>

                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="text-center">
                    <small className="text-cap fs-5" style={{color: '#de8f79', letterSpacing: '4px'}}>— Eventos Disponibles</small>
                        <h4 className="display-4" style={{color: '#494949'}}>1,200</h4>
                        <h5>Ofrecemos más de 1,200 eventos organizados por nuestros partners cada año.</h5>
                    </div>
          </div>
        </div>
      </div>
    );
  };