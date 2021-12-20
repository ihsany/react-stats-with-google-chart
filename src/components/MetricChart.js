import React, {useState} from 'react'
import utils from '../utils';
import { Chart } from './Chart';

function MetricChart() {
    let minVal = 0;
    let maxVal = 0;
    let minDate = Date.now();
    let maxDate = Date.now();
    let timeDelta = 0;
    let totalValue = 0;
    let avgPerMin = 0;
    let avgPerHour = 0;
    let avgPerDay = 0;
    const chartData = [];
    const [metricList, setMetricList] = useState(utils.getAllStorage());

    chartData.push(["Metric", "Time", {role:'annotation'}]);
    for(var i=0;i < metricList.length; i++) {
        var metric = metricList[i].value*1;
        if(minVal > metric) {
            minVal = metric;
        }
        if(maxVal < metric) {
            maxVal = metric;
        }
        chartData.push([   
            metric,
            new Date(metricList[i].timestamp),
            metricList[i].name
        ]);
    }
    totalValue = metricList.map(item => item.value * 1.0).reduce((a, b) => a + b, 0);
    minDate = Math.min(...metricList.map(item=> new Date(item.timestamp)));
    maxDate = Math.max(...metricList.map(item=> new Date(item.timestamp)));
    timeDelta = (maxDate - minDate) / 1000.0;
    if(timeDelta > 0.0) {
        avgPerMin = ((totalValue * 100.0) / (timeDelta) / 60).toFixed(4);
        avgPerHour = ((totalValue * 100.0) / (timeDelta) / (60*60)).toFixed(4);
        avgPerDay = ((totalValue * 100.0) / (timeDelta) / (60*60*24)).toFixed(4);
    }
    
    const chartOptions = {
        title: "Metrics vs Timeline statistics",
        curveType: "function",
        legend: 'none',
        enableInteractivity: true,
        hAxis: { title: 'Metric Value', minValue: minVal, maxValue: (maxVal == 0 ? 10 : maxVal) }
    };

    return (
        <form>
            <div className='form-inner'>
                <div className='form-group'>
                    <table className="rtable">
                        <thead>
                            <tr>
                                <th></th>
                                <th>per Minute</th>
                                <th>per Hour</th>
                                <th>per Day</th>
                            </tr>
                        </thead>
                            <tbody>
                                <tr>
                                    <td>Avg Metric Percentage</td>
                                    <td className='toRight'>%{avgPerMin}</td>
                                    <td className='toRight'>%{avgPerHour}</td>
                                    <td className='toRight'>%{avgPerDay}</td>
                                </tr> 
                            </tbody>
                    </table>
                </div>
                {metricList.length > 0 ? 
                (
                    <Chart data={chartData} options={chartOptions} />
                ) 
                : 
                (
                    <p>
                        <br /> There is not any metric data available. 
                        <br /> If you are a scientist, please login and enter your scientific observations. 
                        <br /> If you are not a scientist, please request help from a scientist.
                    </p>
                )
                }
            </div>
        </form>
    )
}

export default MetricChart
