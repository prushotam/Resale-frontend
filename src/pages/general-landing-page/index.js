import React from 'react';
import "./style.scss";
import LandingFooter from "./LandingFooter";
import GeneralNav from './GeneralNav'

export function useLayout(Component) {
  return function WithLayout(props) {
    return (
      <div className="landing-page">
      <GeneralNav />
        <Component {...props} />
        <LandingFooter />
    </div>
    );
  };
}