import React, { useEffect, useState } from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';

import Footer from './Layouts/Footer';
import Header from './Layouts/Header';
import Page from './Layouts/Page';
import { AuthContext } from './Helpers/AuthContext';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import theme from './Helpers/theme';
function App() {
  const cookies = new Cookies();

  const [role, setRole] = useState(cookies.get('role'));
  const [isAuth, setIsAuth] = useState(false);

  const authentication = async () => {
    const { data } = await axios({
      method: 'post',
      url: '/api/auth',
    });

    if (data === 'zalogowany') {
      setIsAuth(true);
    }
  };

  useEffect(() => {
    authentication();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minHeight="100vh">
        <Header />
        <AuthContext.Provider value={{ isAuth, setIsAuth, role, setRole }}>
          <Page />
        </AuthContext.Provider>

        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
