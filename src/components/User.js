import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from 'react-router-dom';
import Info from './Users/Info';
import Main from './Users/Main';
import Register from './Users/Register';
import Map from './Users/Map';
import ResRegister from './Users/ResRegister';
import ConsRegister from './Users/ConsRegister';
import Blank from './Users/blank';
import Verify from './Users/verify';
import HistoryOrder from './Users/historyOrder';

function User(){

        return(
            <div className="user">

<div className='content'>
                    <div className='left'>
                            {/*左侧 */}
                        <div className='left-content'><center>
                                {/*左侧css */}
                <br/>
                <br/><br/>
                        <div className='main-white-button'>
                        <Link to="info">Info</Link>
                        </div>
                <br/><br/>
                        <div className='main-white-button'>
                        <Link to="register">Register here</Link>
                        </div>
                        <br/><br/>
                        <div className='main-white-button'>
                        <Link to="map">My Order</Link>
                        </div>
                        <br></br>
                        <br></br>
                        <div className='main-white-button'>
                        <Link to="histroyOrder">History Order</Link>
                        </div>
                        
                </center></div>
                        </div>
                {/*右侧 */}
                   <div className='right'>
                {/*在右侧显示链接到的页面 */}    
            <Routes>
            <Route path="main" element={<Main />}/>
            <Route path="info" element={<Info />}/>
            <Route path="register" element={<Register />}/>
            <Route path="map" element={<Map />}/>
            <Route path="ResRegister" element={<ResRegister/>}/>
            <Route path="ConsRegister" element={<ConsRegister/>}/>
            <Route path="blank" element={<Blank/>}/>
            <Route path='verify'element={<Verify/>}/>
            <Route path='histroyOrder' element={<HistoryOrder/>}/>
            </Routes>

                    </div>

</div>
            </div>
            /*嵌套路由 nestedroutes 还要改appjs中route为星号*/
        );
    
}
export default User;
