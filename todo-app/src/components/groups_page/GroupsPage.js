import React,{useEffect} from 'react'
import "./GroupsPage.css"
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import Group from './group/Group';
import Modal from '../modal/Modal';
import { getGroups, addGroup } from '../axios'
import { useSelector, useDispatch } from "react-redux";
import Loading from '../loading/Loading';


function GroupsPage() {

    // data from redux state
    const {user} = useSelector(state => state.user);
    const {groups} = useSelector(state => state.groups);
    const {isLoading} = useSelector(state => state.groups);
    const dispatch = useDispatch();

    // state variables
    const [openModal,setOpenModal] = React.useState(false);
    const [value,setValue] = React.useState("");

    // handle input value change
    const handleValueChange = e =>{
        setValue(e.target.value)
    }
    // handle modal close
    const handleModalClose = () =>{
        setOpenModal(false)
        setValue("")
    }
    // handle save new group
    const handleSaveGroup = () =>{
        dispatch(addGroup(value, user._id))
        setOpenModal(false)
        setValue("")
    }


    useEffect(() => {
        if(user){
            dispatch(getGroups(user._id))
        }

    }, [user])


    // icon style
    const icon={
        color: "rgb(201, 201, 201)",
        fontSize : "3rem"
    }

    return (
        <div className="groups_page">
            {groups?.map(item => <Group key={item._id} group={item} />)}

            <div className="add_group" onClick={()=> setOpenModal(true)}>
                <PostAddRoundedIcon style={icon} />
            </div>
            {openModal && <Modal heading="Group Name" onChange={handleValueChange} value={value} close={handleModalClose} save={handleSaveGroup} />}
            {isLoading && <Loading />}
        </div>
    )
}

export default GroupsPage
