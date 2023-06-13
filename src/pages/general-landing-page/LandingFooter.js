import React from 'react'
import { Link } from 'react-router-dom';
import "./style.scss";
import {
  Button,
  Typography,
  Box,
} from "@mui/material";
import { LinkedIn, Twitter, Instagram, Facebook } from "@mui/icons-material";

function LandingFooter() {
  return (
    <footer className="foot-section">
    <div className="col-xl-10 col-lg-12 mx-auto row">
      <Box>
        <Typography className="hero-title-3">Agarwal Estates</Typography>
        Authentic and innovative. Built to the smallest detail with a focus
        on usability and performance.
        <div className="socialmedia-button-container">
          <Button>
            <LinkedIn color="primary" />
          </Button>
          <Button>
            <Twitter color="primary" />
          </Button>
          <Button>
            <Instagram color="primary" />
          </Button>
          <Button>
            <Facebook color="primary" />
          </Button>
        </div>
      </Box>

      <Box>
        <ul className="footer-menu-title">
          <li>About</li>
        </ul>
        <ul className="footer-menu-links">
          <li>Our Story</li>
          <li>Who we are</li>
          <li>Our Partners</li>
          <li>Our Road Map</li>
        </ul>
      </Box>

      <Box>
        <ul className="footer-menu-title">
          <li>Services</li>
        </ul>
        <ul className="footer-menu-links">
          <li>Property Management</li>
        </ul>
      </Box>

      <Box>
        <ul className="footer-menu-title">Resources</ul>
        <ul className="footer-menu-links">
          <li>Blog</li>
          <li><Link to="/PrivacyPolicy">Privacy Policy</Link></li>
          <li><Link to="/TermsOfUse">Terms of Use</Link></li>
        </ul>
      </Box>

      <Box>
        <ul className="footer-menu-title">Projects</ul>
        <ul className="footer-menu-links">
          <li>Residential</li>
          <li>Commercial</li>
        </ul>
      </Box>
      <Box>
        <ul className="footer-menu-title">Happy Customers</ul>
        <ul className="footer-menu-links">
          <li>Testimonials</li>
          <li>Customers Map</li>
        </ul>
      </Box>
    </div>
  </footer>
  )
}

export default LandingFooter
