import React from "react";
import Navigation from '../Navigation';
import logo from '../../assets/logo.svg';
import picIcon from '../../assets/pic-icon.svg';
import { useSelector } from "react-redux";
import './style.scss';
import StepperComponenet from "../../commonComponent/Stepper";

function Page(props) {

  const {
    role, allAccessibleRoles, handleSwitch, showStages
  } = props;

  const stages = useSelector((state)=> state?.stages?.stages) || [];
  const propertyCurrentStage = useSelector((state)=> state?.buyerHomeData?.selectedProperty?.current_stage);

  
  const getActiveStep = ()=> {
    let activeStep = 0;
    stages.forEach((stage, index) => {
      if(stage._id === propertyCurrentStage){
        activeStep = index
      }
  });
  return activeStep
}

  return (
    <div className="sidebar">
      {props?.showLogo && (
        <>
          <img src={logo} alt="Logo" />
          <div className="imagecontainer">
            <div className="pic_wrapper">
              <img src={picIcon} alt="Profile Icon" />
            </div>
          </div>
          
          <div className="name-text">
            <div>{role}</div>
            {
              allAccessibleRoles && allAccessibleRoles.length > 1 &&
              <div className="switch" onClick={handleSwitch}>Switch Role</div>
            }
          </div>
        </>
      )}
      {
        showStages ?
          <div className="stageContainer">
            <div className="stageWrapper">
              <div className="stageHead">Property Stage</div>
              <div className="stepperWrapper">
                <StepperComponenet
                  boxStyle={{ width: '100%' }}
                  steps={stages}
                  activeStep={getActiveStep()}
                  component={'stages'}
                />
              </div>
            </div>
          </div>
          :
          <Navigation {...props} />
      }
    </div>
  );
}

export default Page;
