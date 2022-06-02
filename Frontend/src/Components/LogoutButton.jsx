import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Helpers/AuthContext';
import { Button } from '@chakra-ui/react';

const LogoutButton = () => {
  const { isAuth, setIsAuth, setRole } = useContext(AuthContext);
  const navigate = useNavigate();

  return isAuth === true ? (
    <Button
      className="Logout"
      onClick={() => {
        axios({
          method: 'post',
          url: '/logout',
        });
        setIsAuth(false);
        setRole('');
        navigate({ pathname: '/' }, { replace: true });
      }}
    >
      Wyloguj się
    </Button>
  ) : null;
};

export default LogoutButton;
