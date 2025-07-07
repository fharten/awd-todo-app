import { Input, InputLeftElement, InputGroup } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddTask from './Functions/addTask';
import { useSWRConfig } from 'swr';
import { FormEvent, useState } from 'react';
import { NewTask } from '@/types/tasks';

export default function AddTaskInput({
  afterSubmit,
}: {
  afterSubmit?: () => void;
}) {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const { mutate } = useSWRConfig();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const newTask: NewTask = {
      title: taskTitle,
    };

    try {
      await AddTask(newTask);
      mutate('/api/tasks');

      setTaskTitle('');

      // with this, we can let the caller know that submit has been successfully handled
      if (afterSubmit && typeof afterSubmit === 'function') {
        afterSubmit();
      }
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      mutate('/api/tasks');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <AddIcon color='gray.300' />
        </InputLeftElement>
        <Input
          aria-label='add New Task'
          focusBorderColor='teal.400'
          autoFocus
          id='title'
          name='title'
          type='text'
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder='Add new task'
        />
      </InputGroup>
    </form>
  );
}
