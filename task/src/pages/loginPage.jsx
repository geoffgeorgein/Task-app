import React, { useContext, useState } from 'react';
import {Link, Navigate} from "react-router-dom";
import UserContext from '../userContext';
import './loginPage.scss';

const LoginPage = () => {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const[redirect,setRedirect]=useState(false);
//   const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  const local="http://localhost:4000";
  

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch(local+'/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      
      
    });
    if (response.ok) {

      response.json().then(userInfo=>{

        setUserInfo(userInfo);
        setRedirect(true);
      })
        
     
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  


  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button>Login</button>
       <Link to={'/register'}><button  className='register'>Register</button></Link>
    </form>
  )
}

export default LoginPage