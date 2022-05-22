import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Outlet, useParams } from 'react-router-dom';
import Menu from './Restaurants/Menu';
import MenuListB from './Restaurants/MenuListB';
import Map from './Users/Map';
import cookie from 'react-cookies'



function Restaurant() {




    

    let role = cookie.load('role')
    if(role == 1 || role == 0 ){
        return (
            <div className="restaurant">
    
                <div className='content'>
                    <div className='left'>
                        {/*左侧 */}
                        <div className='left-content'><center>
                            {/*左侧css */}
                            <br />
                            {/*链接with css */}
                            <div className='main-white-button'>
                                <Link to="menu/1">Restaurant1</Link> {/*超长情况 */}
                            </div>
                            <br /><br />
                            <div className='main-white-button'>
                                <Link to="menu/2">Restaurant2</Link>
                            </div>
    
                        </center></div>
                    </div>
                    {/*右侧显示页面 */}
                    <div className='right'>
                        <Routes>
                            <Route path="menu/1" element={<MenuListB />} />
                            <Route path="menu/2" element={<Menu />} />
    
                        </Routes>
    
                    </div>
    
                </div>
            </div>
            /*嵌套路由 nestedroutes 还要改appjs中route为星号*/
        );
    } else {
        return(
            <div className='tip'>
            <center>
              <p>No Access!</p>
            </center>
          </div>
        )
    }


    

}
export default Restaurant;
