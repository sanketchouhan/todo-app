import React from 'react'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from '../../axios'
import "./Task.css"

function Task({data, groupId}) {

    const dispatch = useDispatch();

    // state variables
    const [edit,setEdit] = React.useState(false);
    const [value,setValue] = React.useState(data.messageBody);


    // handle edit task
    const handleEditTask = () =>{
        dispatch(updateTask(groupId, data._id, value, data.completed))
        setEdit(false)
    }
     // handle task complete
     const handleTaskCompleted = () =>{
        dispatch(updateTask( groupId, data._id, data.messageBody, !data.completed))
    }
    // handle task detele
    const handleTaskDelete = () =>{
        dispatch(deleteTask(groupId, data._id))
    }

    // icon styles
    const deleteIcon = {
        fontSize : "2rem", 
        marginLeft: "1rem", 
        color: "red",
        cursor: "pointer"
    }
    const completedIcon = {
        fontSize : "2rem", 
        color: data.completed ? "green" : "lightgray",
        marginLeft: "1rem",
        cursor: "pointer"
    }
    const editIcon = {
        fontSize : "2rem", 
        color: "lightgray",
        cursor: "pointer"
    }
    const doneIcon = {
        fontSize : "2rem", 
        color: "lightgreen",
        marginLeft: "2rem",
        cursor: "pointer"
    }
    

    return (
        <div className="task">
          <div className="task_name">
          {edit ?
          <input type="text" name="task" id="task" value={value} onChange={e => setValue(e.target.value)} /> 
          : data.messageBody}
          </div>
          <div className="task_btns">
             {edit ?  <DoneRoundedIcon style={doneIcon} onClick={()=> handleEditTask()} /> :
              <> <EditRoundedIcon style={editIcon} onClick={() => setEdit(true)} />
              <CheckCircleRoundedIcon style={completedIcon} onClick={() => handleTaskCompleted()} />
              <DeleteRoundedIcon style={deleteIcon} onClick={() => handleTaskDelete()} /></>}
          </div>
        </div>
    )
}

export default Task
