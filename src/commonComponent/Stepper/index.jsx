import React from 'react'
import { Box, Stepper, Step, StepLabel } from "@mui/material";


const generateLabel = (step, component) => {
    switch (component) {
        case 'stages':
            return (
                <span className="step">{modifyLabel(step.stage_name)}</span>
            )
        case 'transaction':
            return (
                <>
                    <div className="step">{`Paid on: ${step.date}`}</div>
                    <div className="step">{`ID: ${step.transactionId}`}</div>
                    <div className="step">{`Amount: ${step.amount}`}</div>
                </>
            )
        default:
            return (
                <></>
            )
    }
}

const modifyLabel = (name)=>{
    return name.replace("Stage","")
}

const StepperComponenet = (props) => {
    const { boxStyle, steps = [], activeStep , component } = props;

    return (
        <Box sx={boxStyle}>
            <Stepper activeStep={activeStep} orientation="vertical" >
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel>
                            {generateLabel(step,component)}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}

export default StepperComponenet