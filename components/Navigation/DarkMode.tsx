import { useTaskStore } from '@/store';
import { FormControl, FormLabel, Switch, useColorMode } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

export default function DarkMode(): JSX.Element {
  const [darkMode, toggleDarkMode] = useTaskStore((state) => [
    state.darkMode,
    state.toggleDarkMode,
  ]);
  const { toggleColorMode, colorMode } = useColorMode();

  const handleToggle = (_e: ChangeEvent<HTMLInputElement>): void => {
    toggleColorMode();
    toggleDarkMode();
  };

  return (
    <FormControl
      display='flex'
      alignItems='center'
      justifyContent='space-between'
    >
      <FormLabel htmlFor='dark-mode' mb='0'>
        Dark Mode
      </FormLabel>
      <Switch
        colorScheme='teal'
        id='dark-mode'
        isChecked={darkMode}
        onChange={handleToggle}
      />
    </FormControl>
  );
}
