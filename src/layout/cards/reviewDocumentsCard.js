import React from "react";
import "./style.scss";

export default function ReviewDocumentsCard({ icon, text }) {
  return (
    <div className="doc-card">
      <div>
        <img className="card-icons" src={icon} alt="img" />
      </div>
      <div className="text-center mt-50">
        <span>{text}</span>
      </div>
    </div>
  );
}
