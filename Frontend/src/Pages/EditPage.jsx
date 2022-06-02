/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import Form from '../Components/Form';

const EditPage = () => {
  const params = useParams();
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [power, setPower] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await axios
      .get(`/api/tractors/${params.id}`)
      .catch(err => console.log(err));

    if (response) {
      setMake(response.data[0].make);
      setModel(response.data[0].model);
      setPower(response.data[0].power);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      make: make || '',
      model: model || '',
      power: power || '',
    },
    validationSchema: Yup.object({
      make: Yup.string()
        .max(50, 'Maksymalnie 50 znaków')
        .required('Wymagana nazwa marki'),
      model: Yup.string()
        .max(50, 'Maksymalnie 50 znaków')
        .required('Wymagana nazwa modelu'),
      power: Yup.number()
        .typeError('Wpisz liczbę')
        .min(1, 'Minimalna moc 1')
        .required('Podaj moc traktora'),
    }),
    onSubmit: async values => {
      try {
        const { status } = await axios({
          method: 'put',
          url: `/api/tractors/${params.id}`,
          data: {
            id_tractor: params.id,
            make: values.make,
            model: values.model,
            power: values.power,
          },
        });
        if (status === 200) {
          alert('Edycja udana');
          navigate({ pathname: '/' }, { replace: true });
        }
      } catch (err) {
        const { response } = err;
        setError(response.data.error);
      }
    },
  });

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box flexGrow={1}>
      <Text fontSize={'3xl'} textAlign={'center'} mt={5}>
        Edycja traktoru
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

export default EditPage;
