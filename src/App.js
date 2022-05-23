import React, { Component, useState, setState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Outlet, } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Restaurant from './components/Restaurant';
import Manage from './components/Manage';
import ManagerManage from './components/ManagerManage';
import './assets/css/index.css';
import './assets/css/ComA.css';
//import './assets/css/App.css';
import logo from './assets/images/logo.jpg';
import cookie from 'react-cookies'
import {Button, Table} from 'antd'


class App extends Component {

  render(){
    let role = cookie.load('role')
    let name = ""
    if(role == 1){
      name = cookie.load('name')
    } else if( role == 2){
      name = cookie.load('brand')
    }
    
    return (



      <div>
        {/*最上区logo&名 */}
        <h1><img src={logo} alt="" /> Hope We can Leave A Delicious Memory For You</h1>
        {/*主选项区 */}
        <div className="title">
          <Link to="/">Home</Link>
          <Link to="/user">User</Link>
          <Link to="/restaurant">Restaurant</Link>
          <Link to="/manage">Manage</Link>
          <Link to="/admin">Admin</Link>
          <br />
          <br />
        </div>
  
  
        {/*链接路由 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} /> {/*默认页面Home */}
          <Route path="/user/*" element={<User />} />
          <Route path="/restaurant/*" element={<Restaurant />} />
          <Route path="/manage/*" element={<Manage />} />
          <Route path='/admin/*' element={<ManagerManage />} />
        </Routes>
      </div>
      /*<Route path="/user/*" element={<User />}/> path="/user/*" 嵌套路由需要改route为星*/
      /*<Route path="URL" element={functionname}/> */
  
    );
  }



  
}

export default App;

