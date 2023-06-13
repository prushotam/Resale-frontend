import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLayout } from "./index";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import property from "../../assets/hero-11.png";
import property2 from "../../assets/real-estate-1.jpg";
function LandingHome() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const cards = [
    {
      title: "Efficient Lifecycle Management",
      subheading:
        "Our platform seamlessly manages the entire lifecycle of a Sale and Rental transaction, providing guided workflow steps from the Initial offer to Sale Deed and Registration of Property. Never miss a deadline or lose control of the transaction with our automated workflow management",
    },
    {
      title: "Secure Transactions",
      subheading:
        "Facilitate the exchange of funds between buyers and sellers through automated Escrow Accounts maintained at …… bank, all at a fraction of the usual cost. Ensure safe transactions with our platform's built-in security features",
    },
    {
      title: "Digital Contract Management",
      subheading:
        "Easily track and enforce all terms and conditions in the MOU/Agreement for Sale, contingency deadlines, payment schedules, and more with our platform's digital contract management system Enable easy amendments to the terms and conditions with the approval of all relevant parties",
    },
    {
      title: "Quicker Turnaround",
      subheading:
        "Streamline the entire transaction process, from Offer to Escrow deposit, in as little as 30 minutes with our platform's automated features and streamlined workflow",
    },
    {
      title: "Digital Audit Trail",
      subheading:
        "All actions, including amendments and contingency releases, are tracked and recorded with an associated proof generated for future reference. All communications done on the platform can be downloaded and held in court if necessary",
    },
    {
      title: "Seamless Collaboration",
      subheading:
        "Collaborate easily with all parties involved in the transaction, and grant instant access to service providers through our transaction dashboard",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const history = useHistory();

  const handleButtonClick = () => {
    history.push("/user-login");
  };

  return (
    <Box className="content-container">
        <Box sx={{display: "flex",justifyContent:"space-between" ,alignItems:"center"}}>
        <Box sx={{display: "flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
        <Typography variant="h1" className="hero-title">
            Digital Real-Estate Solutions
          </Typography>
          <Typography variant="body1" className="content-formats ">“A Hassle-free Experience”</Typography>
          <Typography variant="h6" className="content-formats mb-4">
            Say goodbye to the stress of a long real estate process and hello to
            more time for what matters - our streamlined 1-month turnaround is
            the solution you've been looking for. Take control of your real
            estate transaction with our empowering technology - trust us for
            maximum transparency and peace of mind. Security is our top priority
            - with our legally valid process and agreements, you can rest
            assured that your transaction is in good hands. Embrace the future
            of real estate with our cutting-edge technology - empowering you
            with maximum control and transparency. Join us in our mission to
            protect the planet with our tree planting initiative - one
            transaction at a time. Plant the Planet. With every transaction,
            we're planting a seed for a greener future, reducing our carbon
            footprint and fostering a sustainable planet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={handleButtonClick}
          >
            Get Started
          </Button>
        </Box>
        <Box sx={{display: "flex",justifyContent:"flex-end",alignItems:"center"}}>
          <img src={property} alt="Property" className="image-landing-1" />
        </Box>
        </Box>

       
        
      <Divider className="mt-4 mb-4" />
      <section className="d-flex  reverse-content">
        <Box
          sx={{
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h3" className="hero-title-2">
            WHY AUTOMATED REAL ESTATE SERVICE?
          </Typography>
          <Typography variant="body1" className="content-formats mb-4">
            Automated real estate services like ZeroChaos offer several
            advantages over traditional real estate services. They provide a
            more efficient and streamlined experience for buyers and sellers,
            eliminating many of the time-consuming tasks and uncertainties
            associated with the process. Also, automated real estate services
            are typically more cost-effective than traditional real estate
            services, as they eliminate the need for costly human
            intermediaries. Overall, automated real estate services like
            ZeroChaos represent the future of real estate, offering a faster,
            more efficient, and more transparent way to buy and sell homes.
          </Typography>
        </Box>

        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <img src={property2} alt="Property" className="round-bordered-img" />
        </div>
      </section>
      <Divider className="mt-4 mb-4" />
      <section className="d-flex  reverse-content">
        <Box
          sx={{
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h3" className="hero-title-2">
            WHY ZEROCHAOS?
          </Typography>
          <Typography variant="body1" className= "content-formats mb-4">
            ZeroChaos is the epitome of streamlined real estate services. With
            an automated platform that handles all aspects of the home buying
            and selling process, this innovative service eliminates the
            inefficiencies and uncertainties that have traditionally plagued the
            industry. Backed by Agarwal Estates, an ISO 9001:2001 Certified real
            estate services company with over 10 years of experience being
            leveraged, ZeroChaos has been created to facilitate buyers and
            sellers to make informed decisions and achieve their real estate
            goals with ease.
          </Typography>
          <Box>
            <ul className="content-list-title">
              <li>Benefits:</li>
            </ul>
            <ul className="content-list-items">
              <li>
                {" "}
                Get real-time status updates and optimize sales with our
                streamlined system.
              </li>
              <li>
                {" "}
                All processes can be done from the convenience of your home
              </li>
              <li> Digitally signed contracts allow easy navigation</li>
              <li>
                {" "}
                There is complete transparency available as seen on the
                dashboard at all times
              </li>
              <li>
                {" "}
                Collaborate easily with electronic workflow and connect with
                stakeholders.
              </li>
              <li>
                {" "}
                Experience the benefits of our platform and optimize your
                business with our team's help
              </li>
            </ul>
          </Box>
          <Box>
            <ul className="content-list-title">
              <li>Real Estate Consultants:</li>
            </ul>
            <ul className="content-list-items">
              <li>
                {" "}
                Lock opportunities early and protect commissions with our
                automated platform.
              </li>
              <li>
                {" "}
                Set transactions on auto cruise for a streamlined process and
                automatic commission disbursement.
              </li>
              <li>
                {" "}
                Instead of the typical 3-month period, the process from MOU to
                Sale Deed and Registration of Property would be done in 1 month
              </li>
            </ul>
          </Box>
          <Box>
            <ul className="content-list-title">
              <li>Buyers:</li>
            </ul>
            <ul className="content-list-items">
              <li>
                {" "}
                Enjoy peace of mind with the use of an escrow service that would
                allow for a well-defined, guided process. Protect your initial
                token advance. Safety of money exchanged
              </li>
              <li>
                {" "}
                Manage transactions on the go with our cost-effective and
                stress-free digital tools.
              </li>
              <li>
                {" "}
                All the legal documents would be vetted by high end lawyers,
                hence protecting your legal interest and thus maintaining
                complete clarity and quality.
              </li>
              <li>
                {" "}
                Through home loan providers, we facilitate a seamless
                transaction and ensure a quicker turnaround time for your
                convenience.
              </li>
            </ul>
          </Box>
          <Box>
            <ul className="content-list-title">
              <li>Sellers & Developers:</li>
            </ul>
            <ul className="content-list-items">
              <li>
                {" "}
                With our straightforward and professional engagement, you can
                secure an early commitment and expedited closing
              </li>
              <li>
                {" "}
                Instead of the process of receiving the money taking the typical
                3 months, the process would take only 1 month
              </li>
            </ul>
          </Box>
        </Box>
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <img src={property2} alt="Property" className="round-bordered-img" />
        </div>
      </section>
      <Divider className="mt-4 mb-4" />
      <Typography variant="h3" className="hero-title-2">
        Workflow Features
      </Typography>
      <Box className="card-container">
        {cards.map((card, index) => (
          <Card
            key={index}
            className={`card-landing ${
              index === currentCardIndex ? "active" : ""
            }`}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2">{card.subheading}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Divider className="mt-4 mb-4" />
      <Typography variant="h3" className="hero-title-2">
        Our Happy Customers
      </Typography>
     
<div className="testimonials">    
      <div className="testimonial">      
      <img className="testimonial-image" src="image1.jpg" alt="Testimonial Image"/>      
      <p className="testimonial-text">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget libero at nibh elementum consectetur vel vitae turpis."</p>      
      <p className="testimonial-author">- John Doe</p>    
      </div>         
      <div className="testimonial">      
      <img className="testimonial-image" src="image2.jpg" alt="Testimonial Image"/>      
      <p className="testimonial-text">"Praesent a finibus urna, id luctus lacus. Nullam tincidunt commodo lectus, in facilisis ipsum ultrices vel."</p>      
      <p className="testimonial-author">- Jane Smith</p>    
      </div>         
      <div className="testimonial">      
      <img className="testimonial-image" src="image3.jpg" alt="Testimonial Image"/>
      <p className="testimonial-text">"Suspendisse potenti. Duis in efficitur magna, sit amet laoreet dolor. Suspendisse ornare enim id nibh vehicula hendrerit."</p>      
      <p className="testimonial-author">- David Johnson</p>    
      </div>  
      </div>
      
    </Box>
  );
}

export default useLayout(LandingHome);
