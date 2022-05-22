import React, { Component } from 'react';
import axios from '../request';
import cookie from 'react-cookies'
import { Table } from 'antd';
import 'antd/dist/antd.css'

class Orderlist extends React.Component {
  constructor() {
    super()

    this.state = {
      orderList: []
    }
  }
    componentWillMount(){
      this.getResOrderList()
    }

    getResOrderList=()=>{
      let userId = cookie.load("userId")
      axios.get("http://localhost:8080/api/order/getResOrderList/" + userId)
      .then((res)=>{
        console.log(res)
        res.data.forEach(element => {
          console.log(element)
          this.setState({
            orderList: [...this.state.orderList, element]
          })
        });
        console.log("state:")
        console.log(this.state)
      })

    }

    assign = (record) => {
      console.log(record)
      let data = {
        "orderId": record.orderId,
        "status": 1
      }
      axios.postJson("http://localhost:8080/api/order/changeStatus", data)
      .then((res)=>{
        console.log(res)
        this.setState({
          orderList: []
        })
        this.getResOrderList()
      })
    }

    complete = (record) => {
      console.log(record)
      let data = {
        "orderId": record.orderId,
        "status": 2
      }
      axios.postJson("http://localhost:8080/api/order/changeStatus", data)
      .then((res)=>{
        console.log(res)
        this.setState({
          orderList: []
        })
        this.getResOrderList()
      })

    }

    render(){
      let self = this
      const columns = [
        {title:'OrderNumber', dataIndex:'orderNum', key:'orderNum'},
        {title:'Brand',dataIndex:'brand',key:'brand'},
        {title:'Consumer Name',dataIndex:'consName',key:'consName'},
        {title:'Location', dataIndex:'location',key:'location'},
        {title:'TotalPrice', dataIndex:"totalPrice",key:'totalPrice'},
        {title:'ETD',dataIndex:'ETD', key:'ETD'},
        {title:'Status', dataIndex:'orderStatus', key:'orderStatus'},
        {title:'Operation', dataIndex:'', key:'assign',render:(record)=> (
          <span>
            {record.originStatus === 0 && (
              <span>
                <a href='#' onClick={e=>this.assign(record)}>Assign Driver</a>
              </span>
            )}
            {record.originStatus == 1 && (
              <span>
                <a href='#' onClick={e=>this.complete(record)}>Complete Delivery</a>
                </span>
            )}
          </span>
        )}
        // {title:'', dataIndex:'', key:'reject',render:(text,record,index)=> <a href="#" name="reject" onClick={()=>self.reject(record)}>Reject</a>}
      ]
      let data = []
      this.state.orderList.forEach(element => {
        let status = 0
        if (element.status == 0){
          status = "Waiting to deliver"
        } else if (element.status == 1){
          status = "On the way"
        } else if (element.status == 2){
          status = "Completed"
        }

        let order = {
          orderNum: element.orderNum,
          brand: element.resInfo.brand,
          consName: element.consInfo.name,
          location: element.location,
          totalPrice: element.totalPrice,
          ETD: element.ETD,
          orderStatus: status,
          orderId:element.orderId,
          resId: element.resId,
          consId:element.consId,
          originStatus: element.status
        }
        data = [...data, order]
      })
      return (
        <Table 
        columns={columns}
        dataSource={data}
        pagination={false}
        className="order"

        />


      );
    }

  }
export default Orderlist