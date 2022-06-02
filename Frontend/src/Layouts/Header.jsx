import { Box} from '@chakra-ui/react';
import Navigation from '../Components/Navigation';
const Header = () => {
    
  return (
    <header>
    <Box height="60px" bgColor='black'>
      <Navigation/>
    </Box>
    </header>
  );
};

export default Header;
