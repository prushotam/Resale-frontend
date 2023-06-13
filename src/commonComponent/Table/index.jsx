import React from 'react';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Table } from "@mui/material";
import DotLoader from '../../layout/LoadingDots';


const TableComponent = (props) => {

    const {heading , rowDetails = [] , containerStyle , tableStyle , headStyle , amountStyle} = props;
    return (
        <TableContainer sx={containerStyle} component={Paper}>
            <Table sx={tableStyle} aria-label="simple table">
                <TableHead sx={headStyle}>
                    <TableRow>
                        <TableCell>{heading || ''}</TableCell>
                        <TableCell align="right">Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowDetails.map((row, index) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right" className={amountStyle && amountStyle[row.name]}>{index && amountStyle && (row.value === 0 || row.value) ? <span>&#8377;</span> : null}{(row.value === 0 || row.value) ? row.value : <DotLoader />}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent