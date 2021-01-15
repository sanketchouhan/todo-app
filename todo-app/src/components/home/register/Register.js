import React from 'react'
import "./Register.css"
import { useHistory } from 'react-router-dom'
import { registerUser } from '../../axios'
import { useSelector, useDispatch } from "react-redux";


function Register() {

    const dispatch = useDispatch();

    // state variables
    const[name,setName] = React.useState("")
    const[password,setPassword] = React.useState("")
    const[confirmPassword,setConfirmPassword] = React.useState("")
    const[error,setError] = React.useState(null)


    // handle name value change
    const handleNameChange = e =>{
        setName(e.target.value)
    }
    // handle password value change
    const handlePasswordChange = e =>{
        setPassword(e.target.value)
    }
    // handle conform password value change
    const handlecConfirmPasswordChange = e =>{
        setConfirmPassword(e.target.value)
    }
    // handle signup
    const handleRegister = () =>{
        if(checkError())
         dispatch(registerUser(name, password))
    }
    // check for error 
    const checkError = () =>{
        if(name.trim().length <= 2 || password.trim().length <= 2){
            setError("Name and Password should 3 characters.")
            return false
        }else if(password.trim() !== confirmPassword.trim()){
            setError("Password & ConfirmPassword not matched.")
            return false
        }else if(name.trim().length > 2 && password.trim().length > 2){
            setError(null)
            return true
        }
    }

    return (
        <div className="register">
             {error && <div className="error">{error}</div>}
            <p className="lable">Name</p>
            <input type="text" name="name" id="name" value={name} onChange={e=>handleNameChange(e)} />
            <p className="lable">Password</p>
            <input type="password" name="password" id="password" value={password} onChange={e=>handlePasswordChange(e)} />
            <p className="lable">Confirm Password</p>
            <input type="password" name="confirmpassword" id="confirmpassword" value={confirmPassword} onChange={e=>handlecConfirmPasswordChange(e)} />
            <div className="register_btn" onClick={()=> handleRegister()}>
                Sign Up
            </div>
        </div>
    )
}

export default Register
