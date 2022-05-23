import { Input, Table } from 'antd';
import axios from '../request';
import React, { Component, setState } from 'react';
import cookie from 'react-cookies'
import "antd/dist/antd.min.css";

class EditItem extends React.Component {
    constructor() {
        super()
        this.state = {
            isRowOpen: false,
            itemList: [],
            editCacheData: []
        }
    }

    componentDidMount() {
        console.log(this.state)
        this.getItemList()
    }

    getItemList = () => {
        let userId = cookie.load("userId")
        axios.get("http://localhost:8080/api/food/showListByUserId/" + userId)
            .then((res) => {
                console.log(res.data)
                res.data.forEach(element => {
                    element["type"] = "view"
                    this.setState({
                        itemList: [...this.state.itemList, element]
                    })
                });
                console.log("state:  ")
                console.log(this.state)
            })
    }

    editSubmit(record) {
        let { itemList, editCacheData } = this.state
        let newData = itemList.map(item => {
            if (item.foodId == editCacheData.foodId) {
                item = Object.assign({}, editCacheData);
                item.type = "view";
            }
            return item;
        });
        this.updateDataSource(newData, true)
        console.log("after submit")
        console.log(this.state)
        let data = this.state.editCacheData
        axios.postJson("http://localhost:8080/api/food/edit",data)

    }

    updateDataSource(newData, isAddDisabled) {
        let isRowOpen =
            typeof isAddDisabled == "boolean"
                ? isAddDisabled
                : newData.some(item => item.type === "new" || item.type === "edit");
        this.setState({
            isRowOpen,
            itemList: newData
        });
    }

    //----cell change start-----------//
    foodNameChange(e, record) {
        this.updateEditCacheData(record, { foodName: e.target.value })
    }
    descriptionChange(e, record) {
        this.updateEditCacheData(record, { description: e.target.value })
    }
    priceChange(e, record) {
        this.updateEditCacheData(record, { price: e.target.value })
    }
    //---------------------------------//
    updateEditCacheData(record, obj) {
        let { editCacheData } = this.state;
        let cacheData =
            record.foodId === editCacheData.foodId
                ? { ...editCacheData, ...obj }
                : { ...record, ...obj };
        this.setState({ editCacheData: cacheData });
    }

    edit(record){
        let data = this.state.itemList
        data.map(item => {
            if (item.foodId === record.foodId) {
              item.type = "edit";
              console.log(item)
            } 
          });
          this.updateDataSource(data, true);
    }

    render() {
        let self = this

        const columns = [
            {
                title: 'Image', dataIndex: '', key: 'img', width: 150, render: (record) => {
                    let img = "http://localhost:8080/" + record.url + ".png"
                    return <img src={img} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                }
            },
            {
                title: 'FoodName', dataIndex: 'foodName', key: 'foodName', render: (foodName, record) => {
                    return record.type !== "view" ? <Input defaultValue={foodName} onChange={e => this.foodNameChange(e, record)} /> : (foodName);
                }
            },
            {
                title: 'Description', dataIndex: 'description', key: 'description', render: ( decription, record) => {
                    return record.type !== "view" ? <Input defaultValue={decription} onChange={e => this.descriptionChange(e, record)} /> : (decription);
                }
            },
            {
                title: 'Price', dataIndex: 'price', key: 'price', render: (price, record) => {
                    return record.type !== "view" ? <Input defaultValue={price} onChange={e => this.priceChange(e, record)} /> : (price);
                }
            },
            {
                title: 'Operation', dataIndex: '', key: 'edit', render: (record) => (
                    <span>
                        {record.type === "edit" && (
                            <span>
                                <a href='#' onClick={e=>this.editSubmit(record)}>Complete</a>
                        </span>
                        )}
                        {record.type === "view" && (
                            <span>
                                <a href='#' onClick={e=>this.edit(record)}>Edit</a>
                            </span>
                        )}
                    </span>
                )
            },
        ]

        const data = self.state.itemList

        return (
            <div>
                <Table 
                    bordered
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    className="table"
                />

            </div >
        )

    }
}

export default EditItem