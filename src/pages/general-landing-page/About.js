import React from "react";
import { useLayout } from './index';
import {
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  Box,
  ImageList,
  ImageListItem,
} from "@mui/material";
function About() {
  return (
    <Box className="content-container">
      <Box className="content-box">
      <Divider>
        <Typography variant="h2" className="hero-title-2">
          About Us
        </Typography>
      </Divider>

      <Typography variant="h6" className="content-formats mb-2 mt-2">
        ZeroChaos is the epitome of streamlined real estate services. With an
        automated platform that handles all aspects of the home buying and
        selling process, this innovative service eliminates the inefficiencies
        and uncertainties that have traditionally plagued the industry. Backed
        by Agarwal Estates, an ISO 9001:2001 Certified real estate services
        company with over 10 years of experience being leveraged. Zerochaos has
        been created to facilitate buyers and sellers to achieve their real
        estate goals with ease and efficiency.
      </Typography>
      <Typography variant="h6" className="content-formats mb-2 mt-2">
        At ZeroChaos, we offer a hassle-free experience for all your real estate
        needs. All processes can be done from the convenience of your home, and
        digitally signed contracts allow for easy navigation. With our
        cutting-edge technology and streamlined processes, you can enjoy maximum
        control, transparency, and peace of mind.
      </Typography>
      <Typography variant="h6" className="content-formats mb-2 mt-2">
        Our platform is secure, with automated escrow accounts maintained at a
        top bank, and all legal documents vetted by high-end lawyers, ensuring
        complete clarity and quality. We facilitate seamless transactions
        through home loan providers, and buyers can enjoy peace of mind with our
        escrow service that protects their initial token advance and safety of
        money exchanged.
      </Typography>
      <Typography variant="h6" className="content-formats mb-2 mt-2">
        For real estate consultants, we offer the ability to lock opportunities
        early and protect commissions with our automated platform. Set
        transactions on auto-cruise for a streamlined process and automatic
        commission disbursement.
      </Typography>
      <Typography variant="h6" className="content-formats mb-2 mt-2">
        Sellers and developers can benefit from our straightforward and
        professional engagement, securing an early commitment and expedited
        closing, with the process taking only one month instead of the typical
        three.
      </Typography>
      <Typography variant="h6" className="content-formats mb-2 mt-2">
        Join us in our mission to protect the planet with our tree-planting
        initiative, one transaction at a time. At Zerochaos, we believe in the
        importance of saving the planet and growing more trees. For every
        transaction you make at Zerochaos, we will plant a tree in your name.
        You will receive an e-certificate that mentions the location of the tree
        as a token of appreciation for your contribution. Together, let's make a
        positive impact on the environment by planting trees and creating a
        greener future.
      </Typography>
      <Typography variant="h6" className="content-formats mb-4 mt-4">
      At ZeroChaos, we strive to make your real estate experience as easy as possible. 
      </Typography>
      </Box>
    </Box>
  );
}

export default useLayout(About)
