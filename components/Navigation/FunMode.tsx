import { useTaskStore } from '@/store';
import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

export default function FunMode() {
  const [funMode, toggleFunMode] = useTaskStore((state) => [
    state.funMode,
    state.toggleFunMode,
  ]);

  const handleToggle = (_e: ChangeEvent<HTMLInputElement>): void => {
    toggleFunMode();
  };

  return (
    <FormControl
      display='flex'
      alignItems='center'
      justifyContent='space-between'
    >
      <FormLabel htmlFor='fun-mode' mb='0'>
        Fun Mode
      </FormLabel>
      <Switch
        colorScheme='teal'
        id='fun-mode'
        isChecked={funMode}
        onChange={handleToggle}
      />
    </FormControl>
  );
}
