import React from "react";
import Stepper from "../../../commonComponent/Stepper"
import TableContainer from "../../../commonComponent/Table"
import TransactionContainer from "../../../commonComponent/TransactionBox"
import "./style.scss";



const View = (props) => {

const {
    label,
    tableAttributes=[],
    addTransaction=[],
    inputAttributes=[],
    handleChange,
    proceed,
    handleClick,
    verifyLoading,
    handleAddTransaction,
    handleDeleteTransaction,
    historySteps=[],
} = props

    return (

        <div className="fee-container">
            <div className="fee-heading">
               { `${label} Amount`}
            </div>
            <div className="tokenContainer">
                <div className="tokenHead">
                    Transfer Details
                </div>
                <div className="tokenBody">
                    <div className="tokenTable">
                        {
                            tableAttributes.map((table, index) => {
                                const { heading, rowDetails, containerStyle, tableStyle, headStyle, amountStyle } = table;
                                return (
                                    <TableContainer
                                        key={index}
                                        heading={heading}
                                        rowDetails={rowDetails}
                                        containerStyle={containerStyle}
                                        tableStyle={tableStyle}
                                        headStyle={headStyle}
                                        amountStyle={amountStyle}
                                    />

                                )
                            })
                        }
                    </div>
                    <div className="transactionIdContainer">
                        <div className="transhead">Add Transaction details</div>
                        <TransactionContainer
                            transactionData={addTransaction}
                            inputAttributes={inputAttributes}
                            handleChange={handleChange}
                            proceed={proceed}
                            handleClick={handleClick}
                            verifyLoading={verifyLoading}
                            handleAddTransaction={handleAddTransaction}
                            handleDeleteTransaction={handleDeleteTransaction}
                        />
                    </div>
                    <div className="transactionHistoryContainer">
                        <div className="historyHead">
                            Transaction History
                        </div>
                        {
                            historySteps.length ?
                                <div className="historyBody">
                                    <Stepper
                                        boxStyle={{ width: '100%' }}
                                        steps={historySteps}
                                        activeStep={historySteps.length}
                                        component={'transaction'}
                                    />
                                </div>
                                :
                                <div>You have not made any transactions yet</div>
                        }

                    </div>
                </div>
            </div>
        </div>

    );
};
export default View;
