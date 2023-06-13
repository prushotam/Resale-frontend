import React from 'react';
import './style.scss'

function DotLoader() {
    return (
        <div className="loading-dots">
            <div className="loading-dots--dot"></div>
            <div className="loading-dots--dot"></div>
            <div className="loading-dots--dot"></div>
        </div>
    )
}

export default DotLoader