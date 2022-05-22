import React, { Component, useEffect, useRef, useState } from 'react';
import axios from '../request'
import cookie from 'react-cookies'
import { useLocation, useNavigate } from 'react-router-dom';
import Register from './Register';


function ConsRegister () {
    
    let navigate = useNavigate()
    let userInfo = useLocation()
    let data = userInfo.state
    console.log("email " + data.email)
    console.log("password " + data.password)
    const [name, setName] = useState('')
    const [contactNum, setContactNum] = useState('')
    const [address, setAddress] = useState('')

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleContactNumChange = (e) => {
        setContactNum(e.target.value)
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const nameNow = useRef('')
    useEffect(()=> {
        nameNow.current = name
    })

    const contactNumNow = useRef('')
    useEffect(()=>{
        contactNumNow.current = contactNum
    })

    const addressNow = useRef('')
    useEffect (()=>{
        addressNow.current = address
    })

    function Register(){
        let postdata = {
            "email": data.email,
            "password": data.password,
            "role": 1,
            "name": nameNow.current,
            "contactNum": contactNumNow.current,
            "address": addressNow.current
        }
        console.log(postdata)
        axios.postJson("http://localhost:8080/api/user/signUp", postdata)
        navigate('/user/blank')
    }
    
    return(
        <div className="register"><center>

            <h1>Hello! Please enter your detail information</h1>

            Name: <input value={name} onChange={handleNameChange} />
            <br /><br />
            Contact Number : <input value={contactNum}  onChange={handleContactNumChange} />
            <br /><br />
            Location: <input value={address}  onChange={handleAddressChange} />

            <br></br>



            <br></br>
            <br></br><br></br>
            <input type="button" name="register" value="               Register              "
                className='loginbutton' onClick={Register} />

        </center></div>
    )

}

export default ConsRegister