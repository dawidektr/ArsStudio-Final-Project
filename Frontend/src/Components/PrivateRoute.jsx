import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Helpers/AuthContext';

const PrivateRoute = ({ userRole }) => {
  const { isAuth, role } = useContext(AuthContext);

  return isAuth === true && userRole.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
