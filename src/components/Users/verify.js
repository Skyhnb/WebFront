import axios from 'axios';
import React, { Component, useEffect } from 'react';

//const axios = require('axios');

function Verify(){

    const getUrlParams = () => {
        const query = this.props.location.search;
        let param = {};
        if(query){
            const paramArr = query.split('&');
            for(let i=0; i<paramArr.length; i++){
                if(i == 0) paramArr[i] = paramArr[i].substr(1,paramArr[i].length);
                let arr = paramArr[i].split('=');
                param[arr[0]] = arr[1];
            }
        }
        return param;
    }

        useEffect(()=> {
            let param = getUrlParams({self:this});
            console.log("param: " + param)
            axios.get()
        })
        return(
            <div className="verify">
                <center>
                    You have verified your email !
                </center>
            </div>
        );
    
}
export default Verify;