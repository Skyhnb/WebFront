import React, { Component, useState, createRef } from 'react';
import { Form, Input, Button, Upload, Icon, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import cookie from 'react-cookies'
import axios from '../request';
import 'antd/dist/antd.min.css'


class AddItem extends React.Component {
    constructor(){
        super()
        this.handleItemNameChange = this.handleItemNameChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.state = [{
            uploading:false,
            itemName: "",
            description:'',
            price:''
        }]
    }

    handleUpload = (foodId) => {
        const { file } = this.state;
        const formData = new FormData();

        formData.append('foodPhoto', file);
        formData.append('foodId', foodId)
        this.setState({
            uploading: true,
        });

        axios.postFormData("http://localhost:8080/api/food/uploadFoodPhoto", formData)
        .then((res)=>{
            console.log(res)
        })


        // You can use any AJAX library you like
        // fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
        //     method: 'POST',
        //     body: formData,
        // })
        //     .then(res => res.json())
        //     .then(() => {
        //         this.setState({
        //             fileList: [],
        //         });
        //         message.success('upload successfully.');
        //     })
        //     .catch(() => {
        //         message.error('upload failed.');
        //     })
        //     .finally(() => {
        //         this.setState({
        //             uploading: false,
        //         });
        //     });
    };

    submitInfo = () => {
        let data = {
            foodName: this.state.itemName,
            description: this.state.description,
            price:this.state.price,
            resId:cookie.load('userId')
        }
        console.log(this.state)
        console.log("data")
        console.log(data)
        axios.postJson("http://localhost:8080/api/food/add", data)
        .then((res)=>{
            console.log(res.data)
            this.handleUpload(res.data.foodId)
        })
    }

    handleItemNameChange=(e)=>{
        this.setState({
            itemName: e.target.value
        })
    }
    handleDescriptionChange=(e)=>{
        this.setState({
            description: e.target.value
        })
    }

    handlePriceChange=(e)=>{
        this.setState({
            price:e.target.value
        })
    }

    render() {
        const { uploading, fileList } = this.state;
        const props = {
            beforeUpload: file => {
                this.setState(() => ({
                    file: file,
                }));
                return false;
            },
            fileList,
        };

        return (
            <div className="additem">
                <br>
                </br>
                <center>
                Item name: <input type="text" name="itemname" value={this.state.itemName} onChange={this.handleItemNameChange}></input>
                </center>
                
                <br></br>
                <center>
                Description: <textarea name="description" value={this.state.description} onChange={this.handleDescriptionChange}></textarea>
                </center>
                
                <br></br>
                <center>
                Price: <input type="number" name="price" value={this.state.price} onChange={this.handlePriceChange}></input>
                </center>
                
                <br></br>
                <center>
                <br></br>
                <br></br>
                </center>



                <center>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                    <Button
                        type="primary"
                        onClick={this.submitInfo}
                        loading={uploading}
                        style={{ marginTop: 16 }}
                    >
                        {uploading ? 'Uploading' : 'Start Upload'}
                    </Button>
                </center>


            </div>
        )
    }



}
export default AddItem;