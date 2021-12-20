import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom' 
import utils from '../utils';

function LoginForm() {
    const [user, setUser] = useState({name:"", email:"", password:"", isAuthanticated:false});
    const adminUser = {
      name: "Ihsan Yaprak",
      email: "ihsan@factorial.co",
      password: "123"
    };

    const navigate = useNavigate();
    const submitHandler = e => {
        e.preventDefault();

        if(user.email == adminUser.email && user.password == adminUser.password) {
            user.isAuthanticated = true;
            utils.setSessionObject('user', user);
            navigate('/admin');
        } else {
            utils.setSessionObject('user', null);
            alert("Invalid crendetials!");    
        }
    }

    return (
        <form onSubmit={submitHandler} >
            <div className='form-inner'>
                <h2>Login</h2>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type="text" name='name' id='name' onChange={e => setUser({...user, name: e.target.value})} value={user.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={e => setUser({...user, email: e.target.value})} value={user.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' onChange={e => setUser({...user, password: e.target.value})} value={user.password} />
                </div>
                <input type="submit" value="Login" />
            </div>
        </form>
    )
}

export default LoginForm;
