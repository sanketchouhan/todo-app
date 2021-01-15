import React from 'react'
import "./Login.css"
import { loginUser } from '../../axios'
import { useDispatch } from "react-redux";


function Login() {

    const dispatch = useDispatch();

    // state variables 
    const[name,setName] = React.useState("")
    const[password,setPassword] = React.useState("")
    const[error,setError] = React.useState(null)

    // handle name value change
    const handleNameChange = e =>{
        setName(e.target.value)
    }
    // handle password value change
    const handlePasswordChange = e =>{
        setPassword(e.target.value)
    }
    // handle login
    const handleLogin = () =>{
        if(checkError()){
            dispatch(loginUser(name.trim(), password.trim()))
        }
    }
    // chekc for error
    const checkError = () =>{
        if(name.trim().length > 2 && password.trim().length > 2){
            setError(null)
            return true
        }else{
            setError("Name and Password should 3 characters.")
            return false
        }
    }

    return (
        <div className="login">
            {error && <div className="error">{error}</div>}
            <p className="lable">Name</p>
            <input type="text" name="name" id="name" value={name} onChange={e=>handleNameChange(e)} />
            <p className="lable">Password</p>
            <input type="password" name="password" id="password" value={password} onChange={e=>handlePasswordChange(e)} />
            <div className="login_btn" onClick={() => handleLogin()}>
                Login
            </div>
        </div>
    )
}

export default Login
