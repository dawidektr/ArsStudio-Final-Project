import axios from 'axios';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Text } from '@chakra-ui/react';
import Form from '../Components/Form';
import { useNavigate } from 'react-router-dom';

const AddPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      make: '',
      model: '',
      power: '',
    },
    validationSchema: Yup.object({
      make: Yup.string()
        .max(200, 'Maksymalnie 200 znaków')
        .required('Wymagana nazwa marki'),
      model: Yup.string()
        .max(200, 'Maksymalnie 200 znaków')
        .required('Wymagana nazwa modelu'),
      power: Yup.number()
        .typeError('Wpisz liczbę')
        .min(1, 'Minimalna moc 1')
        .required('Podaj moc traktora'),
    }),
    onSubmit: async values => {
      try {
        const { status } = await axios({
          method: 'post',
          url: '/api/tractors',
          data: {
            make: values.make,
            model: values.model,
            power: values.power,
          },
        });
        console.log(status);
        if (status === 201) {
          alert('Traktor pomyślnie dodany');
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
        Dodawanie nowego traktoru
      </Text>
      <Form formik={formik} />
      {error && (
        <Text color={'red'} textAlign="center" fontSize={'2xl'}>
          {error}
        </Text>
      )}
    </Box>
  );
};

export default AddPage;
