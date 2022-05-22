import React from "react"

//MenuListB组件A

class ComA extends React.Component{
    render(){
        return(
            <table>
                {/*https://blog.csdn.net/SR2017/article/details/69730621?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165184409116782390587017%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=165184409116782390587017&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-1-69730621-null-null.142^v9^pc_search_result_cache,157^v4^control&utm_term=react+table%E5%A4%A7%E5%B0%8F%E8%AE%BE%E7%BD%AE&spm=1018.2226.3001.4187*/}
                <thead>
                    <tr>
                        <th><input type="checkbox" checked={this.props.allChecked} onChange={()=>{
                            this.props.allCheck()
                        }}/></th>
                        <th>编号</th>
                        <th>书名</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map((item,index)=>{
                    return(<tr key={item.id}>
                        <td><input type="checkbox" checked={item.checked} onChange={(e)=>{
                            this.props.singleCheck(index)
                        }}/></td>
                        <td>{item.id}</td>
                        <td>{item.bookName}</td>
                        <td>{item.bookPrice}</td>
                        <td>
                            <button disabled={item.bookNum===1?true:false}
                            onClick={()=>{this.props.mulNum(index)
                            }}>-</button>
                            {item.bookNum}
                            <button onClick={()=>{
                                this.props.addNum(index)
                            }}>+</button>
                        </td>
                        <td>
                            <button>编辑</button>
                            <button
                            onClick={()=>{
                                this.props.delBook(index)
                            }}>删除</button>
                        </td>
                   </tr>)
                })}
                </tbody>
            </table>
        )
    }
}
export default ComA;
