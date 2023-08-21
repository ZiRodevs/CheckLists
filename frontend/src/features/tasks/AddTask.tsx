import React, { useRef, useEffect } from 'react';
import { TextInput, Button } from 'flowbite-react';
import { HiPlus, HiTrash } from 'react-icons/hi';

type AddTaskHandlerType = (taskText: string) => void;
type ErrorHandlerType = (taskStatus: boolean) => void;
type DeleteAllHandler = () => void;

type Props = {
  helperText: string;
  placeHolderText: string;
  addTaskHandler: AddTaskHandlerType;
  deletAllHandler: DeleteAllHandler;
  errorHandler: ErrorHandlerType;
  spinnerStatus: (status: boolean) => void;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const AddTask = ({
  helperText,
  placeHolderText,
  addTaskHandler,
  deletAllHandler,
  errorHandler,
  spinnerStatus,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function delaySpinner(status: boolean) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(spinnerStatus(status)), 500)
    );
  }

  const handleClick = async () => {
    const text = inputRef.current?.value.trim() || '';
    if (text === '') {
      errorHandler(true);
      scrollToTop();
      return;
    }
    errorHandler(false);
    const inputData = inputRef.current?.value;
    await delaySpinner(true);

    if (inputData) {
      inputRef.current.value = '';
    }

    addTaskHandler(text);
    scrollToTop();
    await delaySpinner(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  return (
    <>
      <div className="max-w-xs">
        <div className="mb-4 block">
          <TextInput
            ref={inputRef}
            helperText={<>{helperText}</>}
            id="addTask"
            placeholder={placeHolderText}
            required
            type="text"
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
        <div className="flex justify-center mb-20">
          <Button
            size="md"
            className="mr-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            onClick={handleClick}
          >
            <HiPlus className="mr-2 h-5 w-5" />
            Add Task
          </Button>
          <Button
            size="md"
            className="mr-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            onClick={deletAllHandler}
          >
            <HiTrash className="mr-2 h-5 w-5 " />
            Delete All
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddTask;
