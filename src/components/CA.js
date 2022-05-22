import React from "react"

class CA extends React.Component {
    render() {

        return (

            <div>



                {this.props.data.map((item, index) => {
                    return (<div>


                        {item.id}
                        {item.bookName}
                        {item.bookPrice}


                        <button>Accept</button>
                        <button
                            onClick={() => {
                                this.props.delBook(index)
                            }}>删除</button>

                    </div>)

                })}


            </div>);
    }
}

export default CA;
