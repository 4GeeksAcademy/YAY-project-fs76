import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../store/appContext';
import { Link } from 'react-router-dom';

export const Landing_Cifras = () => {
    const { store, actions } = useContext(Context);

    return (

        <div className="container content-space-2 content-space-lg-3 my-5">
        <div className="row">
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="text-center">
              <small className="text-cap text-primary">— Valuation methods</small>
              <h4 className="display-4">500,000</h4>
              <p>Our valuation methods are based on more than 500,000 real transactions.</p>
            </div>
          </div>
  
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="text-center">
              <small className="text-cap text-primary">— Coverage</small>
              <h4 className="display-4">75%</h4>
              <p>This represents over 75% of the UK property sales over the past 10 years.</p>
            </div>
          </div>
  
          <div className="col-sm-4">
            <div className="text-center">
              <small className="text-cap text-primary">— Advanced algorithm</small>
              <h4 className="display-4">125,000</h4>
              <p>Our algorithms are updated by data from over 125,000 property sales every year.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };