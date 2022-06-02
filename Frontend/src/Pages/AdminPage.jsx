import React, { useState, useEffect, useContext } from 'react';
import LogoutButton from '../Components/LogoutButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Data from '../Components/Data';
import { AuthContext } from '../Helpers/AuthContext';
import { Box, Button, Text } from '@chakra-ui/react';

const AdminPage = () => {
  const [tractors, setTractors] = useState([]);
  const { role } = useContext(AuthContext);

  const fetchTractors = async () => {
    const { data } = await axios
      .get('/api/tractors')
      .catch(err => console.log(err));
    setTractors(data);
  };

  const deleteTractor = async id_tractor => {
    await axios({
      method: 'delete',
      url: `/api/tractors/${id_tractor}`,
    })
      .then(alert('Oferta usunięta'), fetchTractors())
      .catch(error => alert(error));
  };

  useEffect(() => {
    fetchTractors();
  }, []);

  return (
    <Box flexGrow={1} mb={2}>
      {role === 'admin' ? (
        <Text textAlign={'center'} fontSize={'2xl'} mt={2}>
          Panel administratora
        </Text>
      ) : (
        <Text textAlign={'center'} fontSize={'2xl'} mt={2}>
          Panel użytkownika
        </Text>
      )}

      <Text
        textAlign={'center'}
        fontSize={'2xl'}
        mt={5}
        color={'whiteAlpha.800'}
      >
        Lista Traktorów
      </Text>
      {role === 'admin' ? (
        <Box textAlign={'center'} mt={3}>
          <Link to="/add">
            <Button>Dodaj nowy traktor</Button>
          </Link>
        </Box>
      ) : null}
      <Box textAlign={'center'} mt={2}>
        <LogoutButton />
      </Box>
      <Data data={tractors} handleDelete={deleteTractor} role={role} />
    </Box>
  );
};

export default AdminPage;
