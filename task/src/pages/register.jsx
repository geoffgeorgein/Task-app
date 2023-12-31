import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import './registerPage.scss';

const Register = () => {

    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('https://task-api-cvll.onrender.com/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
      return <Navigate to='/login'/>
    } else {
      alert('registration failed');
    }
  }

  return ( 
    <div>
        <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input type="text"
                placeholder="username"
                value={username}
                onChange={ev => setUsername(ev.target.value)}/>
        <input type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}/>
        <button>Register</button>
        <Link to={'/login'}><button  className='login'>Login</button></Link>
        </form>
    </div>
  )
}

export default Register