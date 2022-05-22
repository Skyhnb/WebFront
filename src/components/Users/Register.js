import React, { Component, useEffect, useRef, useState } from 'react';
import axios from '../request'
import cookie from 'react-cookies'
import { useNavigate } from 'react-router-dom';

//const axios = require('axios');

function Register() {
    //注册页面
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setcPassword] = useState('')
    const [role, setRole] = useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handlecPasswordChange = (e) => {
        setcPassword(e.target.value)
    }
    const handleRoleChange = (e) => {
        setRole(e.target.value)
    }

    const emailNow = useRef('');
    useEffect(() => {
        emailNow.current = email
    })

    const passwordNow = useRef('');
    useEffect(() => {
        passwordNow.current = password
    })
    const cpasswordNow = useRef('');
    useEffect(() => {
        cpasswordNow.current = password
    })
    const roleNow = useRef('')
    useEffect(() => {
        roleNow.current = role
    })

    function Confirm() {
        console.log("register")
        const data = {
            "email": emailNow.current,
            "password": passwordNow.current,
            "role": roleNow.current
        }
        console.log(data)
        if(data.role == 1){
            navigate('/user/ConsRegister', {state: {email: data.email, password: data.password}, replace:true})
        } else if(data.role == 2){
            navigate('/user/ResRegister', {state: {email: data.email, password: data.password}, replace:true})
        }

        

    }


    return (
        <div className="register"><center>

            <h1>Hello! Please enter your username and password</h1>

            Username: <input value={email} onChange={handleEmailChange} />
            <br /><br />
            Password  : <input value={password} type='password' onChange={handlePasswordChange} />
            <br /><br />
            Confirm Password  : <input value={cpassword} type="password" onChange={handlecPasswordChange} />
            <br /><br />
            Role : <select value={role} onChange={handleRoleChange}>
                <option value={0}></option>
                <option value={1}>Consumer</option>
                <option value={2}>Restaurant</option>
            </select>
            <br></br>



            <br></br>
            <br></br><br></br>
            <input type="button" name="register" value="               Confirm              "
                className='loginbutton' onClick={Confirm} />

        </center></div>
    );

}

export default Register;