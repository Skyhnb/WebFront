import React from "react"
//MenuListB组件B

class ComB extends React.Component{
    render(){
        return(
            <div>
                总价格：{this.props.totalPrice}
                总数量：{this.props.totalNum}
            </div>
        )
    }
}
export default ComB;
