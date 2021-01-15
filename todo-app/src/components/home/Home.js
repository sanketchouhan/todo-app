import React, { useEffect } from 'react'
import "./Home.css"
import Register from './register/Register';
import Login from './login/Login';
import { useHistory } from 'react-router-dom'
import { useSelector } from "react-redux";
import Loading from '../loading/Loading';


function Home() {

    let history = useHistory();

    // data from redux store
    const {user} = useSelector(state => state.user);
    const {isLoading} = useSelector(state => state.user);

    // state variable
    const [loginPage,setLoginPage] = React.useState(true);

    useEffect(()=>{
        if(user){
            history.push("/grouppage");
        }
    },[user])

    // switch login and signup page
    const handleLoginPage = (e) =>{
        setLoginPage(e)
    }

    return (
        <div className="home">
           <div className={loginPage ? "left_div_large" : "left_div_small"}>
           {loginPage ?<Login /> : (<div className="log_in">
                   <h2>Login Here</h2>
                   <div className="log_in_btn" onClick={() => handleLoginPage(true)}>
                       Login
                   </div>
               </div>)}
            </div>
           <div className={loginPage ? "right_div_small" : "right_div_large"}>
               {loginPage ? (<div className="sign_up">
                   <h2>Sign Up Here</h2>
                   <div className="sign_up_btn" onClick={() => handleLoginPage(false)}>
                       Sign Up
                   </div>
               </div>) : <Register />}
           </div>
           {isLoading && <Loading />}
        </div>
    )
}

export default Home