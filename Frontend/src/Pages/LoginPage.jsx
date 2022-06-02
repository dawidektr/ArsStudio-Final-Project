import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { AuthContext } from '../Helpers/AuthContext';

const Login = () => {
  const { setIsAuth, setRole } = useContext(AuthContext);
  const cookies = new Cookies();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { status } = await axios({
        method: 'post',
        url: '/api/login',
        data: {
          username: login,
          password: password,
        },
      });
      if (status === 200) {
        setIsAuth(true);
        setRole(cookies.get('role'));
        navigate({ pathname: '/' }, { replace: true });
      }
    } catch (err) {
      const { response } = err;
      setError(response.data.error);
    }
  };
  return (
    <Box flexGrow={1}>
      <Text fontSize={'2xl'} textAlign={'center'} marginTop={5}>
        Musisz się zalogować by przejść dalej
      </Text>
      <Box w={'400px'} margin={'0 auto'} marginTop={8}>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel fontSize={'2xl'} textAlign={'center'}>
              Login
            </FormLabel>
            <Input
              value={login}
              onChange={e => setLogin(e.target.value)}
              placeholder="Wpisz login"
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel fontSize={'2xl'} textAlign={'center'}>
              Hasło
            </FormLabel>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Wpisz hasło"
            />
          </FormControl>
          <Box textAlign={'center'} mt={5}>
            <Button type="submit" colorScheme="blue">
              Zaloguj się
            </Button>
          </Box>
        </form>
      </Box>

      <Text textAlign={'center'} fontSize={'2xl'} mt={5}>
        Jeśli nie posiadasz jeszcze konta{' '}
      </Text>
      <Box textAlign={'center'} mt={5}>
        <Link to="/register">
          <Button colorScheme="blue">Zarejestruj się</Button>
        </Link>
      </Box>
      {error && (
        <Text color={'red'} textAlign="center" fontSize={'2xl'}>
          {error}
        </Text>
      )}
    </Box>
  );
};

export default Login;
