import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Modal from '../modal/Modal'
import Task from './task/Task'
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import "./TasksPage.css"
import Loading from '../loading/Loading';
import { useSelector, useDispatch } from "react-redux";
import { addTask, updateGroup, deleteGroup } from '../axios'




function TasksPage() {

    // get group id from route
    const location = useLocation()
    const groupId = location.state.group

    // get state data
    const {user} = useSelector(state => state.user);
    const {groups} = useSelector(state => state.groups);
    const {isLoading} = useSelector(state => state.groups);
    const dispatch = useDispatch();

    // state variables
    const [groupDetail,setGroupDetail] = React.useState(null)
    const [openSaveTaskModal,setOpenSaveTaskModal] = React.useState(false);
    const [editGroup,setEditGroup] = React.useState(false);
    const [value,setValue] = React.useState("");

    useEffect(()=>{
        if(groups){
            let group = groups.filter(i => i._id == groupId)[0]
            if(group)
                setGroupDetail(group)
            else
                history.push("/grouppage");
        }   
    },[groupId,groups])

    // set input value
    const handleValueChange = e =>{
        setValue(e.target.value)
    }

    // open save task modal
    const handleSaveTaskModalOpen = () =>{
        setOpenSaveTaskModal(true)
    }
    // handle save new task
    const handleSaveTask = () =>{
        dispatch(addTask(value, groupDetail._id))
        handleModalClose()
    }

    // handle edit group
    const handleEditGroup = () =>{
        dispatch(updateGroup(groupDetail.name, groupDetail._id))
        handleModalClose()
    }

    // handle Group delete
    const handleGroupDelete = (id) =>{
        dispatch(deleteGroup(id, user._id))
    }

    // close all modal
    const handleModalClose = () =>{
        setOpenSaveTaskModal(false)
        setValue("")
    }
   
    let history = useHistory();

    // handle back to group page
    const handleBack = () => {
        history.push("/grouppage");
    }

    // Icon styles
    const icon={
        color: "rgb(201, 201, 201)",
        fontSize : "2.5rem"
    }
    const back={
        color: "#000000",
        fontSize : "2rem",
        cursor: "pointer"
    }
    const deleteIcon = {
        fontSize : "2rem", 
        color: "red",
        cursor: "pointer"
    }
    const editIcon = {
        fontSize : "2rem", 
        color: "lightgray",
        marginLeft: "1rem", 
        cursor: "pointer"
    }
    const doneIcon = {
        fontSize : "2rem", 
        color: "lightgreen",
        marginLeft: "2rem",
        cursor: "pointer"
    }

    return (
        <div className="tasks_page">
            <div className="group_name">
                <ArrowBackRoundedIcon style={back} onClick={handleBack} />
                 {editGroup ?
                   <> <input type="text" name="task" id="task" value={groupDetail?.name} onChange={e => setGroupDetail({...groupDetail, name: e.target.value})} /> 
                    <DoneRoundedIcon style={doneIcon} onClick={()=> handleEditGroup()} /></>
                    :<> <h1>{groupDetail?.name}</h1>
                    <EditRoundedIcon style={editIcon} onClick={() => setEditGroup(true)} />
                    <DeleteRoundedIcon style={deleteIcon} onClick={() => handleGroupDelete(groupDetail._id)} />
                    </>}
            </div>
            {groupDetail?.tasks.map(item => <Task data={item} key={item._id} groupId={groupDetail._id} />)}

            <div className="add_task" onClick={() => handleSaveTaskModalOpen()}>
                <PostAddRoundedIcon style={icon} />
            </div>

            {/* Save Task Modal */}
            {openSaveTaskModal && <Modal heading="Task Name" onChange={handleValueChange} value={value} close={handleModalClose} save={handleSaveTask} />}
            
            {isLoading && <Loading />}
        </div>
    )
}

export default TasksPage
