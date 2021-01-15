import React, { useEffect } from 'react'
import SideMenuTile from './side_menu_tile/SideMenuTile'
import './SideMenu.css'
import { useSelector } from "react-redux";

function SideMenu() {

    // data from redux store
    const {user} = useSelector(state => state.user);
    const {groups} = useSelector(state => state.groups);

    // state variable
    const [total,setTotal] = React.useState(0);
    const [completed,setcompleted] = React.useState(0);

    
    useEffect(()=>{
        if(groups){
            let t = 0;
            let c = 0;
            groups.forEach(item => {
                t += item.tasks.length 
                c += item.tasks.filter(i => i.completed == true).length 
            });
            setTotal(t)
            setcompleted(c)
        }
           
    },[groups,user])

    return (
        <div className="side_menu">
            <p className="p_1">Hello,</p>
            {user && <p className="p_2">{user.name}</p>}
            {groups && <div className="tiles">
                    <SideMenuTile title='Total tasks' count={total} color='blue' />
                    <SideMenuTile title='Completed' count={completed} color='green' />
            </div>}
        </div>
    )
}

export default SideMenu



