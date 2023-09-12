import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../userContext';

const Protected = () => {
    const {setUserInfo,userInfo} = useContext(UserContext);
    console.log("usrINfo",userInfo);
  if (Object.keys(userInfo).length>0) {
    return (<Navigate to='/home'/>)
  }
  else{
    return <Navigate to='/login'/>
  }

 
 
};

export default Protected;

// Object.keys(userInfo).length