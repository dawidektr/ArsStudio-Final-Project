import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box height="60px" bgColor="black">
      <Text
        color="tomato"
        fontWeight="bold"
        fontSize="larger"
        textAlign="center"
        lineHeight="2"
      >
        Tractors © All rights reserved
      </Text>
    </Box>
  );
};

export default Footer;
