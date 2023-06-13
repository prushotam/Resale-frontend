import React, { useEffect, useState } from "react";
import "./style.scss";
import { GiHamburgerMenu } from "react-icons/gi";

import { NavLink , useHistory} from "react-router-dom";

import menu from "../../assets/menu.svg";
import notify from "../../assets/notify.svg"; 
import ava from "../../assets/ava.svg";

import {logoutUser} from '../../pages/login/slices';
import { useDispatch } from "react-redux";
import colors from '../../styles/colors.scss';


const UserNavbar = ({props, text}) => {
  const role = sessionStorage.getItem('role')
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [show, setShow] = useState(false);
  const history = useHistory();


  const [showBigImage,setShowBigImage]=useState(false);

  const dispatch = useDispatch()

  const handleClick = ()=>{
      sessionStorage.clear();
      dispatch(logoutUser())
      history.push('/user-login')
  }


  
  useEffect(()=>{
    if(props?.currentScreen && props?.currentScreen === "user_home"){
      setShowBigImage(true)
    }

  },[props?.currentScreen])

  return (
    <>
      <nav className={showBigImage ? 'home-nav' : 'main-nav'}>

        <div className="userlogo">
          <img src={menu} alt="logo" className={showBigImage ? 'homeImage' : 'menu'} />
        </div>

        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>
            <li>
              <NavLink to="/buyer-home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/service">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact">My Properties</NavLink>
            </li>
          </ul>
        </div>

        <div className="social-media">
          <ul className="social-media-desktop">
            <li>
              <img src={notify} alt="notify" className="notify-image" />
            </li>
            <li>
              <img
                src={ava}
                className="buyer-image"
                onClick={() => setShow(!show)}
              />
            </li>
            {show && (
              <div className="buyer-logout">
                <li>
                  {role === "BANK AGENT" ?
                   <a href="/agent-profile">Profile Setting</a>
                  :
                  <a href="/profile-settings">Profile Setting</a>
                  }
                </li>
                <li>
                  <a onClick={handleClick}>Logout</a>
                </li>
              </div>
            )}
          </ul>

          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu className="ham" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
