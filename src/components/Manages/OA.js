import React from "react"

class OA extends React.Component{
        render(){
 
        return(
            
<div>



                    {this.props.data.map((item,index)=>{
                    return( <div>
                        

                        {item.id}
                        {item.bookName}
                        {item.bookPrice}
                        
                    {/*下拉框*/}    
                        <select >
                            <option >AB</option>
                            <option >BC</option>
                            <option >CD</option>
                            <option >DE</option>
                            <option >EF</option>
                        </select>
                            <button
                            >Order arrived</button>
                        
                        </div> )
                        
                })}
                

</div>  );
    }
}

export default OA;
