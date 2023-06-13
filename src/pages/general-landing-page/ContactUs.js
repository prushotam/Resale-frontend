import React from "react";
import { useLayout } from "./index";
import { Divider, Typography, Box } from "@mui/material";

function ContactUs() {
  return (
    <Box className="content-container">
      <Box className="content-box">
        <Divider>
          <Typography variant="h2" className="hero-title-2">
            Contact us
          </Typography>
        </Divider>
        <ul className="content-list-title">
          <li><Typography variant="h6">Give us a call or drop by anytime.</Typography></li>
          
        </ul>
        <ul className="content-list-items">
          <li>
          <Typography variant="h6" className="content-formats">BANGALORE HQ</Typography>
          </li>
          <li>
          <Typography variant="h6" className="content-formats">No.9, CRM Soubhagya Annexe,</Typography>
          </li>
          <li>
          <Typography variant="h6" className="content-formats">#35/1B, Varthur main road,</Typography>
          </li>
          <li>
          <Typography variant="h6" className="content-formats">Near Spice Garden, Marathahalli, Bangalore-37</Typography>
          </li>
          <li>
          <Typography variant="h6" className="content-formats">Contact number: 70900 01122</Typography>
          </li>
          <li>
          <Typography variant="h6" className="content-formats">Email ID – service@zerochaos.in, sales@zerochaos.in</Typography>
          </li>
        </ul>
      </Box>
    </Box>
  );
}

export default useLayout(ContactUs);
