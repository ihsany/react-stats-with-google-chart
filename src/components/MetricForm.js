//https://github.com/Hacker0x01/react-datepicker

import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom' 
import DatePicker from "react-datepicker";
import List from '../components/List';
import utils from '../utils';

import "react-datepicker/dist/react-datepicker.css";

function MetricForm() {
    const [stat , setStat] = useState({
        timestamp : Date.now(),
        name : "",
        value: 0
    });
    const [metricList, setMetricList] = useState(utils.getAllStorage());
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        setMetricList(utils.getAllStorage());
        setUser(utils.getSessionObject('user'));
    }, []);

    const addMetric = e => {
        e.preventDefault();
        if(stat.name == "" || isNaN(stat.value) || isNaN(stat.timestamp)) {
            alert("Invalid metric values");
        } else {
            utils.setStorageObject(stat.name, stat);
            setMetricList(utils.getAllStorage());
        }
        setStat({
            timestamp : Date.now(),
            name : "",
            value: 0
        })
    };

    const removeMetric = metricKey => {
        utils.removeStorageObject(metricKey);
        setMetricList(utils.getAllStorage());
    };

    const Logout = () => {
        utils.setSessionObject('user',null);
        navigate('/');
    };

    return (
        <div>
            <form onSubmit={addMetric} >
                <div className='welcome'>
                    Welcome {user.name} <br />
                    <a href="#" onClick={Logout}>Logout</a>
                </div>
                <div className='form-inner'>
                    <h2>Metric Entry Screen</h2>
                    <div className='form-group'>
                        <label htmlFor='name'>Metric name</label>
                        <input type="text" name='name' id='name' onChange={e => setStat({...stat, name: e.target.value})} value={stat.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="value">Metric value</label>
                        <input type="text" name="value" id="value" onChange={e => setStat({...stat, value: e.target.value})} value={stat.value} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="timestamp">Metric date</label>
                        <DatePicker selected={stat.timestamp} 
                            onChange={datetime => setStat({...stat, timestamp: Date.parse(datetime)})} 
                            value={stat.timestamp} 
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeInput />
                    </div>
                    <input type="submit" value="Save" />
                    <div className='metric-list'>
                        <h3>Metrics</h3>
                        <List data={metricList} removeMetric={removeMetric} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MetricForm;