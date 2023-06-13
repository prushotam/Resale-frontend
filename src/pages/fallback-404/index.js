import React from 'react'
import { Button } from '@mui/material'
import './style.scss';
import { useHistory } from "react-router-dom";


function Fallback() {
  const history = useHistory()
  return (
    <div className='fallback-container'>
        <div className='content-container'>
            <div className='status-text'>404</div>
            <div className='oops-text'>Ooops!!!</div>
            <div className='message'>That page doesn't exist or unavailable</div>
            <div className='button'>
                <Button variant="contained"  onClick={()=>history.push('/super-admin-login')}>Go To Home</Button>
            </div>
        </div>
    </div>
  )
}

export default Fallback