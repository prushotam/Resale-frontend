import React from 'react'
import './style.scss'
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const buttonStyles = {
  textTransform: 'none',
  color: 'var(--gray)',
};

export default function Footer() {
  return (
    <div className="footer">
      <Button variant='text' sx={{ ...buttonStyles }} component={Link} to="/TermsOfUse">Terms & Conditions</Button>
      <Button variant='text' sx={{ ...buttonStyles }} component={Link} to="/PrivacyPolicy">Privacy Policy</Button>
      <Button variant='text' sx={{ ...buttonStyles }}>
        Copyright © 2020. Agarwal Estates. All rights reserved.
      </Button>
    </div>
  )
}
