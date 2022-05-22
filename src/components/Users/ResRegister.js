import React, { Component, useEffect, useRef, useState } from 'react';
import axios from '../request'
import cookie from 'react-cookies'
import { useLocation, useNavigate } from 'react-router-dom';
import Register from './Register';


function ResRegister () {
    
    let navigate = useNavigate()
    let userInfo = useLocation()
    let data = userInfo.state
    console.log("email " + data.email)
    console.log("password " + data.password)
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [contactNum, setContactNum] = useState('')
    const [location, setLocation] = useState('')

    const handleBrandChange = (e) => {
        setBrand(e.target.value)
    }
    const handleDecriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handleContactNumChange = (e) => {
        setContactNum(e.target.value)
    }

    const handleLocationChange = (e) => {
        setLocation(e.target.value)
    }

    const brandNow = useRef('')
    useEffect(()=> {
        brandNow.current = brand
    })

    const descriptionNow = useRef('')
    useEffect(()=>{
        descriptionNow.current = description
    })

    const contactNumNow = useRef('')
    useEffect(()=>{
        contactNumNow.current = contactNum
    })

    const locationNow = useRef('')
    useEffect (()=>{
        locationNow.current = location
    })

    function Register(){
        let postdata = {
            "email": data.email,
            "password": data.password,
            "role": 2,
            "brand": brandNow.current,
            "description": descriptionNow.current,
            "contactNum": contactNumNow.current,
            "location": locationNow.current
        }
        console.log(postdata)
        axios.postJson("http://localhost:8080/api/user/signUp", postdata)
        navigate('/user/blank')
    }
    
    return(
        <div className="register"><center>

            <h1>Hello! Please enter your detail information</h1>

            Brand: <input value={brand} onChange={handleBrandChange} />
            <br /><br />
            Description  : <input value={description}  onChange={handleDecriptionChange} />
            <br /><br />
            Contact Number : <input value={contactNum}  onChange={handleContactNumChange} />
            <br /><br />
            Location: <input value={location}  onChange={handleLocationChange} />

            <br></br>



            <br></br>
            <br></br><br></br>
            <input type="button" name="register" value="               Register              "
                className='loginbutton' onClick={Register} />

        </center></div>
    )

}

export default ResRegister