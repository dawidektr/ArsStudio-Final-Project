import axios from 'axios';
import React, { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      rpassword: '',
    },
    validationSchema: Yup.object({
      login: Yup.string()
        .min(6, 'Login za krótki, co najmniej 6 znaków')
        .max(50, 'Maksymalnie 50 znaków')
        .required('Wymagany login'),
      password: Yup.string()
        .max(2000, 'Maksymalnie 50 znaków')
        .min(6, 'Hasło za krótkie, co najmniej 6 znaków')
        .required('Wymagane hasło'),
      rpassword: Yup.string()
        .min(6, 'Hasło za krótkie, co najmniej 6 znaków')
        .max(2000, 'Maksymalnie 50 znaków')
        .required('Wymagane hasło')
        .oneOf([Yup.ref('password')], 'Hasła się nie zgadzają'),
    }),
    onSubmit: async values => {
      try {
        const { status } = await axios({
          method: 'post',
          url: '/api/register',
          data: {
            login: values.login,
            password: values.password,
          },
        });
        if (status === 200) {
          alert('Konto zarejestrowane');
          navigate({ pathname: '/' }, { replace: true });
        }
      } catch (err) {
        const { response } = err;
        setError(response.data.error);
      }
    },
  });

  return (
    <Box flexGrow={1}>
      <Text fontSize={'3xl'} textAlign={'center'} mt={5}>
        Rejestracja
      </Text>
      <Box width={'400px'} margin={'0 auto'} mt={5}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel fontSize={'2xl'} textAlign={'center'}>
              Login
            </FormLabel>
            <Input
              id="login"
              name="login"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.login}
              placeholder="Wpisz login"
            />
            {formik.touched.login && formik.errors.login ? (
              <Text color={'red'} textAlign={'center'}>
                {formik.errors.login}
              </Text>
            ) : null}
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'2xl'} textAlign={'center'}>
              Hasło
            </FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Wpisz hasło"
            />
            {formik.touched.password && formik.errors.password ? (
              <Text color={'red'} textAlign={'center'}>
                {formik.errors.password}
              </Text>
            ) : null}
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'2xl'} textAlign={'center'}>
              Powtórz hasło
            </FormLabel>
            <Input
              type="password"
              id="rpassword"
              name="rpassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rpassword}
              placeholder="Wpisz hasło"
            />
            {formik.touched.rpassword && formik.errors.rpassword ? (
              <Text color={'red'} textAlign={'center'}>
                {formik.errors.rpassword}
              </Text>
            ) : null}
          </FormControl>
          <Box textAlign={'center'} mt={5}>
            <Button type="submit" colorScheme="blue">
              Zajerestruj się
            </Button>
          </Box>
        </form>
        {error && (
          <Text color={'red'} textAlign="center" fontSize={'2xl'}>
            {error}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default RegisterPage;
