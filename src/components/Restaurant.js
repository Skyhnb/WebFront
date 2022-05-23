import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Outlet, useParams } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from './request';
import MenuDetails from './Restaurants/MenuDetails'
import { Typography } from 'antd'

const { Title } = Typography


class Restaurant extends Component {
    constructor() {
        super()
        this.state = {
            resList: []
        }
    }


    componentDidMount() {
        this.getResList()
    }

    getResList = () => {
        axios.get('http://localhost:8080/api/user/showRes')
            .then((res) => {
                console.log(res.data)
                this.setState({
                    resList: res.data
                })
                console.log(this.state)
            })
    }


    render() {

        let role = cookie.load('role')

        if (role == 1 || role == 0) {
            let data = this.state.resList
            return (
                <div className="restaurant">

                    <div className='content'>
                        <div className='left'>
                            {/*左侧 */}
                            <div className='left-content'>
                                <center>
                                    <br></br>
                                    <div>
                                        <Title>Restaurants</Title>
                                    </div>
                                </center>

                                {
                                    data.map(element => {
                                        console.log('=================');
                                        console.log(element);
                                        return (
                                            <center>
                                                <br></br>
                                                <div className='main-white-button'>
                                                    <Link to={`menu/${element.userId}`}>{element.brand}</Link>
                                                    <Outlet />
                                                </div>
                                                <br></br>
                                            </center>

                                        )

                                    })
                                }


                            </div>
                        </div>
                        {/*右侧显示页面 */}
                        <div className='right'>
                            <Routes>
                                <Route path='menu/:userId' element={<MenuDetails/>} />
                            </Routes>

                        </div>


                    </div>
                </div>
                /*嵌套路由 nestedroutes 还要改appjs中route为星号*/
            );
        } else {
            return (
                <div className='tip'>
                    <center>
                        <p>No Access!</p>
                    </center>
                </div>
            )
        }


    }








}
export default Restaurant;
