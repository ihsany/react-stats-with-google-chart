import React from 'react'
import { TiDeleteOutline } from "react-icons/ti";

function List({data, removeMetric}) {

    const remove = key => {
        removeMetric(key);
    };
    
    return (
        (data.length > 0) ? (
            <div>
                <table className="rtable">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Value</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                        <tbody>
                            {data
                            .sort((a, b) => a.timestamp < b.timestamp ? - 1 : Number(a.timestamp > b.timestamp))
                            .map((item) => (
                                    <tr key={item.name}>
                                        <td><span onClick={()=>remove(item.name)} className='pointer'><TiDeleteOutline color='red' /></span></td>
                                        <td>{item.name}</td>
                                        <td>{item.value}</td>
                                        <td>{new Date(item.timestamp).toLocaleString()}</td>
                                    </tr> ))
                            }
                        </tbody>
                </table>
            </div>)
        : 
        (
            <div>Metric data not available</div>
        )
    );
}

export default List