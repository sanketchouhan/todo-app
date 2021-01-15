import React from 'react'
import { useHistory } from 'react-router-dom';
import "./Group.css"

function Group({group}) {

    let history = useHistory();

    // click to task page
    const handleClick = () => {
        history.push("/taskpage" , {group : group._id});
      }

    return (
        <div className="group" onClick={handleClick}>
            <div className="heading">
                {group.name}
            </div>

            <p className="created_on">Created on: {(new Date(group.createdAt)).toLocaleDateString()}</p>
        </div>
    )
}

export default Group
