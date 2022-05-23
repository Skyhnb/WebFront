import React, { Component } from 'react';
import mapimage from '../.././assets/images/map.JPG';
import cookie from 'react-cookies';
import axios from '../request';
import { Table, Card } from 'antd';

/*..退一层 */


class Map extends Component {
    constructor() {
        super()
        this.state = {
            order:{}
        }
    }


    componentWillMount() {
        this.getCurrentOrder()
    }

    getCurrentOrder = () => {
        let userId = cookie.load('userId')
        axios.get("http://localhost:8080/api/order/getCurrent/" + userId)
            .then((res) => {
                console.log(res)
                this.setState({
                    order: res.data
                })
                console.log(this.state)
            })
    }



    render() {
        let self = this
        // const {width,height} = this.props;

        const columns = [
            {title:'OrderNumber', dataIndex:'orderNum', key:'orderNum'},
            {title:'ETD',dataIndex:'ETD', key:'ETD'},
            {title:'Status', dataIndex:'orderStatus', key:'orderStatus'},
            {title:'TotalPrice', dataIndex:'totalPrice', key:'totalPrice'}
        ]
        let orderStatus =""
        const data = self.state.order
        if (data.status == 0) {
            orderStatus = "waiting to deliver"
        } else if (data.status == 1) {
            orderStatus = "on the way"
        } else if (data.status == 2) {
            orderStatus = "completed"
        }

        data['orderStatus'] = orderStatus
        console.log(data)
        let tableData = []
        tableData = [...tableData, data]

        const expandedRowRender = (data) => {
            const columns = [
                {title: 'FoodName', dataIndex:'foodName', key: 'foodName'},
                {title:'Price', dataIndex:'price', key:'price'},
                {title:'Count', dataIndex:'count', key:'count'}
            ]

            let childData = []
            data.detail.forEach(element => {
                childData = [...childData, element]
            });

            return <Table columns={columns} dataSource={childData} pagination={false}/>
        }

        return (

          <div> 
              <Table columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    expandable={{expandedRowRender}}
                    className='order'

              />
            {/* <div className="map" style={{ width: `${width}px`, height: `${height}px`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }} > */}
           
                <img src={mapimage}  style={{width:'auto',height:'100%'}} alt=""/>
            {/* </ div> */}
        </div> 


        );

    }


   

}
                export default Map;