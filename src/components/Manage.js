import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Outlet, useParams } from 'react-router-dom';
import AddItem from './Manages/AddItem';
import Orderlist from './Manages/Orderlist';
import cookie from 'react-cookies'
import EditItems from './Manages/EditItems'

function Manage() {
    let role = cookie.load('role')

    if(role == 2){
        return (
            <div className="manage">
                <div className='content'>
                    <div className='left'>
                        <div className='left-content'><center>
                            {/*左侧 */}
                            <br />
                            <div className = 'main-white-button'>
                                <Link to= "editItems">Edit item</Link>
                            </div>
                            <br /><br />
                            <div className='main-white-button'>
                                <Link to="restaurantManageAdd">Add item</Link>
                            </div>
                            
                            
                            <br /><br />
                            <div className='main-white-button'>
                                <Link to="orderlist">Order list</Link>
                            </div>
    
                        </center></div>
                    </div>
    
    
                    <div className='right'>
                        <Routes>
                            <Route index element={<EditItems/>}/>
                            <Route path="editItems" element={<EditItems/>}/>
                            <Route path="restaurantManageAdd" element={<AddItem />} />
                            <Route path="orderlist" element={<Orderlist />} />
                        </Routes>
                    </div>
                </div>
            </div>
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
export default Manage;