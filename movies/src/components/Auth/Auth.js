import React from 'react';
import AuthForm from './AuthForm';
import { senduserAuthRequest } from '../../api-helpers/api-helper';
import { useDispatch } from "react-redux";
import { userActions } from '../../store';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const onResReceived = (data) =>{
  console.log(data);
  dispatch(userActions.login());
  localStorage.setItem("userId", data.id)
  navigate("/")
 }
  const getData = (data) => {
    console.log(data);
    senduserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch(err => console.log(err));
  };

  return (
    <AuthForm onSubmit={getData} isAdmin={false}/>
  );
}

export default Auth;
