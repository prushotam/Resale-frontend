import React from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/menu.svg";
import Button from "@mui/material/Button";
import { AccountCircle, PersonAdd } from "@mui/icons-material";

function GeneralNav() {
  const history = useHistory();
  const handleLogin = () => {
    history.push("/user-login");
  };
  const handleSignup = () => {
    history.push("/signup");
  };

  return (
    <header className="header">
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="menu-landing-general">
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/AboutUs">About Us</Link>
          </li>
          <li>
            <Link to="/ContactUs">Contact Us</Link>
          </li>
          <li>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: "20px", marginRight: "3px" }}
              onClick={handleLogin}
            >
              <AccountCircle sx={{ marginRight: "8px" }} />
              Sign In
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: "20px" }}
              onClick={handleSignup}
            >
              <PersonAdd sx={{ marginRight: "8px" }} />
              Sign Up
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default GeneralNav;
