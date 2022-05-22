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
            order:""
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
            })
    }



    render() {
        let self = this
        // const {width,height} = this.props;

        const columns = [
            {title:'OrderNumber', dataIndex:'orderNum', key:'orderNum'},
            {title:'ETD',dataIndex:'ETD', key:'ETD'},
            {title:'Status', dataIndex:'orderStatus', key:'orderStatus'},
        ]
        
        const data = self.state.order
        // if (data.status == 0) {
        //     status = "waiting to deliver"
        // } else if (data.status == 1) {
        //     status = "on the way"
        // } else if (data.status == 2) {
        //     status = "completed"
        // }

        return (

          <div> 
              {/* <Table columns={columns}
                    dataSource={data}
                    pagination={false}

              /> */}
            {/* <div className="map" style={{ width: `${width}px`, height: `${height}px`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }} > */}
           
                <img src={mapimage}  style={{width:'auto',height:'100%'}} alt=""/>
            {/* </ div> */}
        </div> 


        );

    }


   

}
                export default Map;