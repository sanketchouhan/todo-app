import React from 'react'
import "./Loading.css"
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading() {

    return (
        <div className="loading" >
            <CircularProgress color="primary" />
        </div>
    )
}

export default Loading
