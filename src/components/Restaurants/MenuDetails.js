import { Component, useEffect, useState, useRef } from "react";
import { Route, useParams } from 'react-router-dom';
import axios from '../request'
import { Table, Button, Input } from 'antd'
import cookie from 'react-cookies'

function MenuDetails() {
    const param = useParams()
    const [itemList, setItemList] = useState('')
    const [userId, setUserId] = useState('')
    const [selectedRow, setSelectedRow] = useState([])

    // const [selectedRowKeys, setSelectedRowKeys] = useState('')

    const itemListNow = useRef('')
    useEffect(()=>{
        itemListNow.current = itemListNow
    })

    const getFoodItem = () => {
        console.log(param)
        setUserId(param.userId)
        console.log(userId)
        axios.get('http://localhost:8080/api/food/showListByUserId/' + param.userId)
            .then((res) => {
                console.log(res)
                res.data.map(element => {
                    element['count'] = 0
                })
                setItemList(res.data)
            })
    }



    useEffect(() => {
        getFoodItem()
    }, [param])

    const countOnChange = (e, record) =>{

    }

    const columns = [
        {
            title: 'Image', dataIndex: '', key: 'img', width: 150, render: (record) => {
                let img = "http://localhost:8080/" + record.url + ".png"
                return <img src={img} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            }
        },
        { title: 'FoodName', dataIndex: 'foodName', key: 'foodName' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        {title: 'Amount', dataIndex:'count',key:'count', render:(record)=>{
            return (
                <Input defaultValue={0} onChange={e=>countOnChange(e,record)}/>
            )
        }},



    ]

    const rowSelection = {
        onChange: (selectedRowKeys, newselectedRows) => {
            console.log(`selectedRowKeys:  ${selectedRowKeys}`, 'selectedRows: ', newselectedRows)
            setTimeout(() => {
                setSelectedRow(newselectedRows)
            }, 1000)
            console.log(selectedRow)
        },

        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows)
        }


    }

    const createOrder = () => {
        let consId = cookie.load('userId')
        let resId = param.userId
        let details = [
            {'foodId': 1, 'count': 2},
            {'foodId': 2, 'count':3}
        ]
        let totalPrice = 19

        let data = {
            'consId': consId,
            'resId':resId,
            'details':details,
            'totalPrice': totalPrice,
            'location': 'somewhere'
        }

        axios.postJson('http://localhost:8080//api/order/create', data)
        .then((res)=>{
            console.log('success')
            console.log(res)
            if(res.status == 200){
                window.location.reload()
                alert('Success')
            }
        })
    }



    return (
        <div>
            <Table columns={columns}
                dataSource={itemList}
                rowSelection={rowSelection}
                pagination={false}
                rowKey={record => record.foodId}
            >

            </Table>

            <Button onClick={createOrder}>Submit</Button>
        </div>
    )


}

export default MenuDetails