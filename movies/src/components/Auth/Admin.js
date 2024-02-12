// Admin.js

import React from 'react';
import AuthForm from './AuthForm';
import { useDispatch } from 'react-redux';
import { sendAdminAuthRequest } from '../../api-helpers/api-helper';
import { adminActions } from '../../store';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

  const navigate= useNavigate();
  const dispatch = useDispatch();

  const onResReceived = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem('adminId', data.id);
    localStorage.setItem('token', data.token);
    navigate("/")
  };

  const getData = (data) => {
    console.log('Admin', data);
    sendAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };

  return <AuthForm onSubmit={getData} isAdmin={true} />;
};

export default Admin;
