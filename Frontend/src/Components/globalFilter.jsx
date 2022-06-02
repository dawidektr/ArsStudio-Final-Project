import { Box, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 100);

  return (
    <Box textAlign={'center'} mt={10} mb={3}>
      <Text letterSpacing={1} fontSize={'2xl'}>
        Wyszukaj:
      </Text>
      <Input
        mt={1}
        maxWidth={'350px'}
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Liczba rekordów: ${count} `}
      />
    </Box>
  );
}
