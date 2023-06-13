import React, { useState } from 'react'
import { Button, Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import './style.scss'
import { useLocation } from 'react-router-dom';
import { updatePreferredRole, toggleRoleSelectionModal } from '../../pages/login/slices'

const UserTypeSelection = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const roles = useSelector(state => state.loggedInUser.roles);
    const preferredRole = useSelector(state => state.loggedInUser.preferredRole);
    const isModalOpen = useSelector(state => state.loggedInUser.isRoleSelectionModalOpen)

    const isLoginPage = ['/super-admin-login' , '/admin-login'].includes(location.pathname)

    const [selectedRole, setSelectedRole] = useState(preferredRole);
    const [enableSave, setEnableSave] = useState(false);

    const handleChange = (e) => {
        setSelectedRole(e.target.value)
        setEnableSave(true)
    }

    return (
        <>
            {
                isModalOpen && !isLoginPage ?
                    <div className='modalWrapper'>
                        <div className='modalContainer'>
                            <div className='modalHead'>
                                User Type
                            </div>
                            <Divider color="#FDA228" sx={{ borderBottomWidth: 5 }} />
                            <div className='modalBody'>
                                <div className='modalText'>
                                    You have multiple role. Which role you want to continue in?
                                </div>
                                <div className='selectUser'>
                                    <FormControl sx={{ m: 1, minWidth: 120 }} >
                                        <InputLabel id="user-selection">Role</InputLabel>
                                        <Select
                                            labelId="user-selection"
                                            id="user-selection"
                                            value={selectedRole}
                                            label="Role"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="" disabled>
                                                None
                                            </MenuItem>
                                            {
                                                roles?.map((role, index) =>
                                                    <MenuItem key={index} value={role}>{role}</MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className='modalFooter'>
                                <div className='button'>
                                    <Button variant="contained" disabled={!enableSave} onClick={() => dispatch(updatePreferredRole(selectedRole))}>
                                        Save
                                    </Button>
                                </div>
                                <div className='button'>
                                    <Button variant="contained" disabled={!preferredRole} onClick={() => dispatch(toggleRoleSelectionModal())}>
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}

export default UserTypeSelection