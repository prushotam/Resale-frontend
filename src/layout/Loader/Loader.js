import React from "react";
import "./Loader.css";

export default function Loader ({css}) {
  return (
    <div className="spinner-container" style={css}>
      <div className="loading-spinner"></div>
    </div>
    );
}