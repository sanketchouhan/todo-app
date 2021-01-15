import React from 'react'
import './SideMenuTile.css'

function SideMenuTile({title , count, color}) {

    const style={
        borderRadius: '5px',
        borderLeft: `1.5px solid ${color}` 
    }

    return (
        <div className="tile" style={style}>
            <p className="title">{title}</p>
            <p className="count">{count}</p>
        </div>
    )
}



export default SideMenuTile
