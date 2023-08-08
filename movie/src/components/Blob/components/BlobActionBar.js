import React from 'react';
import { Container, Box } from '@chakra-ui/react';
import RandomizerBtn from './Controls/RandomizerButton';

const BlobActionBar = () => (
  <Box>
    <Container centerContent maxW="sm">
        <RandomizerBtn />
    </Container>
  </Box>
);

export default BlobActionBar;