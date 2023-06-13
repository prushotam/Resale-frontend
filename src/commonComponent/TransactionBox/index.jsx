import React from 'react';
import { Button, TextField, Box } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
const TransactionBox = (props) => {
    const {
        transactionData = [],
        inputAttributes = [],
        handleChange,
        proceed,
        handleClick,
        verifyLoading,
        handleAddTransaction,
        handleDeleteTransaction
    } = props;

    return (
        <Box
            component="form"
            sx={{ p: 2, border: '1px solid #3981be', borderRadius: '5px' }}
            noValidate
            autoComplete="off"
        >
            {
                transactionData.map((transaction, index) => {
                    const { id, addButton, deleteButtton } = transaction
                    return (
                        <div className="transactionWrapper" key={id}>
                            <Box
                                component="form"
                                sx={{ p: 2, border: '1px solid grey', borderRadius: '5px' }}
                                noValidate
                                autoComplete="off"
                            >
                                <div className="inputWrapper">
                                    <div className="input">
                                        {
                                            inputAttributes.map((attr) => {
                                                const { key, label } = attr;
                                                return (
                                                    <TextField key={key} sx={{ width: "55%" }} disabled={proceed} id="outlined-basic" label={label} variant="outlined" size='small' color="primary" name={key} value={transaction[key]} onChange={(e) => handleChange(e, id)} />
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="addButtons">
                                        {
                                            addButton && <div className="add"><Button variant="contained" color="primary" disabled={proceed} size="small" onClick={handleAddTransaction}>+ Add</Button></div>
                                        }
                                        {
                                            deleteButtton && <div><Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteTransaction(id)}></Button></div>
                                        }
                                    </div>
                                </div>
                            </Box>
                        </div>
                    )
                })
            }
            <div className='button'>
                {
                    proceed ?
                        <Button variant="contained" color='primary' onClick={() => console.log("procced")} >
                            Proceed
                        </Button>
                        :
                        <LoadingButton
                            size="medium"
                            loading={verifyLoading}
                            variant="contained"
                            color='primary'
                            onClick={handleClick}
                        >
                            <span>Verify</span>
                        </LoadingButton>
                }
            </div>
        </Box>
    )
}

export default TransactionBox