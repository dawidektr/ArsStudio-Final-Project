import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as LinkRouter } from 'react-router-dom';

const NavLink = ({ click, children }) => (
  <Link
    as={LinkRouter}
    px={2}
    py={1}
    bg={'black'}
    rounded={'md'}
    zIndex={999}
    onClick={click}
    _hover={{
      textDecoration: 'none',
      bg: 'gray.700',
    }}
    to={children === 'Strona główna' ? '/' : children}
  >
    {children}
  </Link>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Links = ['Strona główna'];
  return (
    <>
      <Box>
        <Flex h={16} alignItems={'center'} justifyContent={'center'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            mr={'5'}
            ml={'auto'}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
              textAlign={'center'}
            >
              {Links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
        </Flex>
        {isOpen ? (
          <Box display={{ md: 'none' }} textAlign={'center'} bg={'black'}>
            <Stack as={'nav'}>
              {Links.map(link => (
                <NavLink click={onClose} key={link}>
                  {link}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
