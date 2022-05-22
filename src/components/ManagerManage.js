import { Table, Button, Input } from 'antd';
import React, { Component , setState} from 'react';
import cookie from 'react-cookies'
import axios from './request'
import "antd/dist/antd.css";


class ManagerManage extends React.Component {
  constructor() {
    super()
    this.state = {
      resList:[],
    }
  }

  componentWillMount() {
    console.log(this.state)
    this.getUnapproved()
    
  }


  getUnapproved=()=> {
    axios.get("http://localhost:8080/api/admin/showApproveList")
      .then( (response)=> {
        console.log(response)
        response.data.forEach(element => {
          console.log(element)
          this.setState({
            resList: [...this.state.resList, element]
          })
        });

        console.log("state:")
        console.log(this.state)
      })
  }

  approve = (record)=>{
    console.log(record)
    let data = {
      "approved": 1,
      "userId": record.userId
    }
    axios.postJson("http://localhost:8080/api/admin/approveOrNot", data)
    .then((res)=>{
      console.log('approve!')
      this.setState({
        resList:[]
      })
      this.getUnapproved()
    })
  }

  reject = (record)=>{
    console.log(record)
    let data = {
      "approved":2,
      "userId": record.userId
    }
    axios.postJson("http://localhost:8080/api/admin/approveOrNot", data)
    .then((res)=>{
      console.log('reject!')
      this.setState({
        resList:[]
      })
      this.getUnapproved()
    })

  }

  render() {
    let role = cookie.load('role')
    if (role == 0) {
      let self = this;
      const columns = [
        {title:'Brand', dataIndex:'brand', key:'brand'},
        {title:'Email',dataIndex:'email',key:'email'},
        {title:'Description',dataIndex:'description',key:'description'},
        {title:'Location', dataIndex:'location',key:'location'},
        {title:'Contact Number',dataIndex:'contactNum', key:'contactNum'},
        {title:'', dataIndex:'', key:'approve',render:(text,record,index)=> <a href="#" name="approve" onClick={()=>self.approve(record)}>Approve</a>},
        {title:'', dataIndex:'', key:'reject',render:(text,record,index)=> <a href="#" name="reject" onClick={()=>self.reject(record)}>Reject</a>}
        
      ]

      const data = self.state.resList

      return (
        <div>
          <Table columns={columns}
            dataSource={data}
            pagination={false}
            className="table"/>
        </div>
        // <div className="App">
        //   <h3>Restaruant Audit</h3>
        //   <div>
        //     {
        //       this.state.resList.map((item, index) => {

        //           return (

        //             <div>
        //               <table>
        //                 <thead>
        //                   <th>Brand</th>
        //                   <th>Email</th>
        //                   <th>Description</th>
        //                   <th>Location</th>
        //                   <th>Contact Number</th>
        //                   <th></th>
        //                   <th></th>
        //                   </thead>
        //                   <tbody>
                          
        //               <td>{item.brand}</td>
        //               <td>{item.email}</td>
        //               <td>{item.description}</td>
        //               <td>{item.location}</td>
        //               <td>{item.contactNum}</td>
  
        //               <td> <button onClick={}>Approve </button></td>
  
        //               <td><button >Reject</button></td>
                      
        //               </tbody>
        //               </table>
        //               </div>
                     
        //           )

      
        //       })
        //     }
        //   </div>

        // </div>
      )
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
export default ManagerManage;