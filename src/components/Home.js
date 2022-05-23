import React, { Component, useEffect, useRef, useState } from 'react';
import axios from './request'
import cookie from 'react-cookies'
import { useNavigate } from 'react-router-dom';


//const axios = require('axios');



function Home() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmailChange = (e) =>{
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const emailNow = useRef('');
    useEffect (()=>{
        emailNow.current = email
    })

    const passwordNow = useRef('');
    useEffect (()=> {
        passwordNow.current = password
    })

    const showMessage = () => {
        console.log( 'email: ' + email ); //获取的永远是上一次send之前的值 点击前输入框的值
        console.log( 'You input latest value: ' + email.current ); //最新值
      };

    function login(){
        console.log("login")
        const data = {
            "email": emailNow.current,
            "password": passwordNow.current
        }
        axios.postJson("http://localhost:8080/api/user/signIn",data)
        .then(function(response){
            console.log(response)
            cookie.save('userId', response.data.userId)
            cookie.save('role', response.data.role)
            console.log(cookie.load('userId'))
            console.log(cookie.load('role'))
            if(response.data.role == 2){
                cookie.save('resId', response.data.resId)
                cookie.save('brand', response.data.brand)
            } else if(response.data.role == 1){
                cookie.save('consId', response.data.consId)
                cookie.save('name', response.data.name)
                console.log(cookie.load('name'))
            }
            if(response.data.role === 1 ){
                navigate('/user/info', {state: {role: response.data.role,name: response.data.detail.name}, replace: true})
            } else if(response.data.role === 2){
                navigate('/manage/editItems', {state: {role: response.data.role}, replace: true})
            } else if(response.data.role === 0){
                navigate('/admin', {state: {role: response.data.role}, replace: true})
            }
        })
        .catch(function(error){
            console.log(error)
        })

    }

    return (
        <div className="home">

            <center>
                {/*登录 */}
                <h1>Hello! Please login</h1>

                Username: <input value={email} onChange={handleEmailChange} />
                <br /><br />
                Password  : <input value={password} type='password' onChange={handlePasswordChange} />
                <br /><br />
                <input type="button" name="login" value="               login              "
                    className='loginbutton' onClick={login}/>
                <br /><br />
                Create a account? <a href='/user/register'>Register here</a>

            </center>

        </div>


    );

}


export default Home;