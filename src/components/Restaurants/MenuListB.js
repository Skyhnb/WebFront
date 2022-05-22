import React from "react"
import ComA from './ComA';
import ComB from './ComB';
import Map from '../Users/Map';
import { BrowserRouter as Router, Route, Link, Routes, Outlet, useParams } from 'react-router-dom';


//https://blog.csdn.net/qq_44711316/article/details/109394426?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165079537916781483733927%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=165079537916781483733927&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-2-109394426.142^v9^pc_search_result_cache,157^v4^control&utm_term=react+%E8%B4%AD%E7%89%A9%E8%BD%A6%E6%95%B0%E9%87%8F%E5%8A%A0%E5%87%8F&spm=1018.2226.3001.4187

class MenuListB extends React.Component{
    constructor(){
        super()
        {/*表单*/}
        this.state={
          booklist:[
            {
              id:1,
              bookName:"小红书",
              bookPrice:18,
              bookNum:1,
              checked:false
            },{
              id:2,
              bookName:"小兰书",
              bookPrice:15,
              bookNum:1,
              checked:false
            },{
              id:3,
              bookName:"小黑书",
              bookPrice:20,
              bookNum:1,
              checked:false
            },{
              id:4,
              bookName:"小白书",
              bookPrice:12,
              bookNum:1,
              checked:false
            },{
              id:5,
              bookName:"小书",
              bookPrice:1,
              bookNum:1,
              checked:false
            }
          ],
          totalPrice:0,
          totalNum:0,
          allChecked:false
        }
      }
      //子组件ComA减数量按钮操作
      mulNum(i){
        let list = [...this.state.booklist]
        list[i].bookNum--;
        this.setState({
          booklist:list
        })
        this.getToTal()
      }
      //子组件ComA加数量按钮操作
      addNum(i){
        let list = [...this.state.booklist]
        list[i].bookNum++;
        this.setState({
          booklist:list
        })
        this.getToTal()
      }
      //子组件ComA删除按钮操作
      delBook(i){
        let list = [...this.state.booklist];
        if(list[i].checked){
          list[i].checked = !list[i].checked;
        }
        list.splice(i,1)
        this.setState({
          booklist:list
        })
        this.getToTal()
      }
      //子组件ComA单选按钮操作
      singleCheck(i){
        let list = [...this.state.booklist]
        list[i].checked = !list[i].checked;
        let allChecked = this.state.allChecked;
        let tag = list.every((item)=>{return item.checked})
        allChecked = tag;
        this.setState({
          booklist:list,
          allChecked:allChecked
        })
        this.getToTal()
      }
        //子组件ComA全选按钮操作
      allCheck(){
        let list = [...this.state.booklist]
        let allChecked = !this.state.allChecked
        list.map((item)=>{item.checked = allChecked})
        this.setState({
          booklist:list,
          allChecked:allChecked
        })
        this.getToTal()
      }
      //子组件ComB计算总价和总数
      getToTal(){
        let list = [...this.state.booklist];
        let total = 0;
        let num = 0;
        let newlist = list.filter((item)=>{return item.checked == true});
        newlist.map((item)=>{
          total += item.bookPrice * item.bookNum
          num += item.bookNum
        })
        this.setState({
          totalPrice:total,
          totalNum:num
        })
      }
      componentWillMount(){
        this.getToTal()
      }


    
      render(){
         return (
        <div className="App">
         <h3>简易购物车</h3>
         <ComA data={this.state.booklist} 
         mulNum={this.mulNum.bind(this)}
         addNum={this.addNum.bind(this)}
         delBook={this.delBook.bind(this)}
         singleCheck={this.singleCheck.bind(this)}
         allCheck={this.allCheck.bind(this)}
          allChecked={this.state.allChecked} 
         ></ComA>
         <ComB totalPrice={this.state.totalPrice} 
              totalNum={this.state.totalNum}></ComB>
            <div>
            <a href='/user/map'><button>Confirm Order</button></a>

            </div>            
        </div>
      );
      }

}

export default MenuListB;

