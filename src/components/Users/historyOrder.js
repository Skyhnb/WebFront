import React, { Children, Component } from 'react';
import axios from '../request';
import cookie from 'react-cookies'
import { Table } from 'antd';

class HistoryOrder extends React.Component {
    constructor() {
        super()

        this.state = {
            orderList: []
        }
    }
    componentWillMount() {
        this.getResOrderList()
    }

    getResOrderList = () => {
        let userId = cookie.load("userId")
        axios.get("http://localhost:8080/api/order/getConsOrderList/" + userId)
            .then((res) => {
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

    render() {
        let self = this
        

        
        const columns = [
            { title: 'OrderNumber', dataIndex: 'orderNum', key: 'orderNum' },
            { title: 'Brand', dataIndex: 'brand', key: 'brand' },
            { title: 'Consumer Name', dataIndex: 'consName', key: 'consName' },
            { title: 'Location', dataIndex: 'location', key: 'location' },
            { title: 'TotalPrice', dataIndex: "totalPrice", key: 'totalPrice' },
            { title: 'ETD', dataIndex: 'ETD', key: 'ETD' },
            { title: 'Status', dataIndex: 'orderStatus', key: 'orderStatus' },
        ]

        const childrenColumns = [
            {title:'FoodName', dataIndex:'foodName', key:'foodName'},
            {title:'Price', dataIndex:'price', key:'price'},
            {title:'Count', dataIndex:'count', key:'count'}
            ]
        let data = []
        this.state.orderList.forEach(element => {
            let status = 0
            if (element.status == 0) {
                status = "Waiting to deliver"
            } else if (element.status == 1) {
                status = "On the way"
            } else if (element.status == 2) {
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
                orderId: element.orderId,
                resId: element.resId,
                consId: element.consId,
                originStatus: element.status,
                children:element.details
            }
            data = [...data, order]
        })
        return (
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                childrenColumnName={childrenColumns}
                className="order"

            />


        );
    }

}
export default HistoryOrder