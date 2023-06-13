import React from "react";
import './style.scss';
import searchIcon from '../../assets/search.svg';
import { useLocation } from "react-router-dom";

function Page(props) {
  const url = useLocation();
  return (
    <div className="searchBar">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <img src={searchIcon} alt="Search icon" />
          </span>
        </div>
        {!url.pathname.includes('manage-properties') ?
        <input type="text" className="form-control" placeholder="Search" onChange={(e)=>props.onChange(e.target.value)} />
        :
        <input type="text" className="form-control" placeholder="Search for properties" onChange={(e)=>props.onChange(e.target.value)} />
      }
      </div>
    </div>
  );
}

export default Page;
