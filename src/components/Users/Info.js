import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from '../request';
import { Card } from 'antd';
import 'antd/dist/antd.min.css'

//const axios = require('axios');

class Notification extends Component {
    constructor() {
        super()
        this.state = {
            notification: []
        }
    }


    getNotification = () => {
        let userId = cookie.load('userId')
        let role = cookie.load('role')

        if (role == 1) {
            axios.get('http://localhost:8080/api/noti/show/' + userId)
                .then((res) => {
                    console.log(res.data)
                    this.setState({
                        notification: res.data
                    })
                    console.log(this.state)
                    console.log(typeof (this.state))
                })
        }
    }

    componentDidMount() {
        this.getNotification()
    }



    render() {
        const data = this.state.notification
        console.log(data)

        return (
            <div>
                {
                    data.map(element => {
                        console.log('===============')
                        console.log(element)
                        return (
                            <div className='site-card-border-less-wrapper'>
                                <Card title='notification' bordered={false} style={{ width: 300 }}>
                                    <p>Time: {element.time}</p>
                                    <p>Content: <br></br>{element.content}</p>
                                </Card>
                            </div>

                        )

                    })
                }

            </div>
        )

    }
}

export default Notification


