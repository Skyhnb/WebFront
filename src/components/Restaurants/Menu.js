import React, { Component, useState, setState } from 'react';
import {Link, Route, Routes, BrowserRouter, useParams } from 'react-router-dom';
//import {getInvoices} from "./MenuList"; 
import { getMenuList, addamount } from './MenuList';
import ReactDOM from 'react-dom';
//import function from URL
//*************废弃代码*********************

//function Menu(){
   /* let state={
        count:0
    };
    
    function onAdd() {
        this.setState({
            count: this.state.count +1
        });
    };
    function onSub() {
        this.setState(prevState=>{
            return{
            count: prevState.count -1
            };
        });
    };*/

export default function Menu(){




let menu = getMenuList();
//let a=addamount();
let arr=[{
a:0,
count:0,
}];

let a=0;
const params= useParams()
const [count, setCount]=useState(0);

       return(

<div>

{menu.map((menulist)=>(
<main>
    <p 
  /*  style={{display: "block", margin:"1rem 0"}}
    to={`/invoices/${menulist.number}`}跳转
key={menulist.number}*/
    >
   {/* <Link
    style={{display: "block", margin:"1rem 0"}}
    to={`/invoices/${menulist.number}`}
    key={menulist.number}
>    </Link>*/}
id: {menulist.number}<br/> 
    {menulist.name} 
    <br/>
    {menulist.amount} 

    <br/>
    {menulist.dish}
    </p>

<b>{a++}</b>

    <button>
        -</button > 
      <span>  {count} </span>       {/*count the amount of dish*/}
    <button id={a} 
                            /*onClick={() => setCount(count + 1)}*/>
        +</button>
       
</main>
    //  </Link>
    ))}

     
<button>
        Confirm</button > 

</div>
        );

}
                        

//Listing the Invoices
//menu=invoices getMenuList=getInvoices menulist=invoice
//https://reactrouter.com/docs/en/v6/getting-started/tutorial#add-some-routes

/*
function addNum(i){
        //创建一个arraylist 放入amount
        let list = [this.state.menulist]
        list[i].amount++;
        
      }

  //子组件ComA减数量按钮操作
function  mulNum(i){
        let list = [...this.state.menulist]
        list[i].amount--;
        this.setState({
                menulist:list
        })
  }*/