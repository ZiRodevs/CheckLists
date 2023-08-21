import React, { useRef, useEffect } from 'react';
import {
  Checkbox,
  Label,
  Button,
  TextInput,
  Card,
  Badge,
} from 'flowbite-react';
import { HiTrash, HiOutlinePencil, HiClock } from 'react-icons/hi';

type DeleteTaskHandlerType = (text: string) => void;
type ChangeTaskStatusHandlerType = (id: string) => void;

type Props = {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
  isEditing: boolean;
  deleteTask: DeleteTaskHandlerType;
  changeTaskStatus: ChangeTaskStatusHandlerType;
  changeEditingStatus: (id: string) => void;
  changeEditedText: (id: string, text: string) => void;
};

function Task({
  id,
  text,
  done,
  createdAt,
  isEditing,
  deleteTask,
  changeTaskStatus,
  changeEditingStatus,
  changeEditedText,
}: Props) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateTaskTitle(id);
      changeEditingStatusAndFocus(id);
    }

    if (event.key === 'Space') {
      changeTaskStatus(id);
    }
  };

  const editRef = useRef<HTMLInputElement>(null);

  const updateTaskTitle = (id: string) => {
    if (editRef.current) {
      changeEditedText(id, editRef.current.value);
    }
  };
  const changeEditingStatusAndFocus = (id: string) => {
    if (editRef.current) {
      editRef.current.focus();
    }
    changeEditingStatus(id);
  };
  return (
    <Card className="mb-6 " href="#">
      <div className="flex items-center">
        <Checkbox
          className="hover:cursor-pointer mr-3 focus:ring-0"
          id={id}
          onClick={() => changeTaskStatus(id)}
          defaultChecked={done}
        />
        {isEditing ? (
          <TextInput
            id="small"
            sizing="sm"
            type="text"
            placeholder={text}
            value={text}
            ref={editRef}
            className="min-w-fit"
            onChange={() => updateTaskTitle(id)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <Label
            className="font-bold tracking-tight text-gray-900 dark:text-white"
            htmlFor={id}
          >
            <p
              className={`hover:cursor-pointer font-light font-mono  ${
                done && 'line-through'
              }`}
            >
              {text}
            </p>
          </Label>
        )}
      </div>

      <div className="text-sm font-normal text-gray-700 dark:text-gray-300 flex items-center">
        <p className="mr-2"> Created at:</p>
        <Badge icon={HiClock} color="success">
          {createdAt}
        </Badge>
      </div>

      <div className="flex justify-start gap-3">
        <Button.Group>
          <Button
            className="text-green-400 hover:bg-green-300 dark:bg-gray-600 dark:hover:bg-green-200/50 dark:text-white/90 focus:ring-0 dark:border-none"
            color="green"
            size="xs"
            onClick={() => changeEditingStatusAndFocus(id)}
          >
            <HiOutlinePencil className="mr-2 h-5 w-5" />
            {!isEditing ? <p>Edit</p> : <p>Save</p>}
          </Button>
          <Button
            className="text-red-400 hover:bg-red-300 dark:bg-gray-600 dark:hover:bg-red-200/50 dark:text-white/90 focus:ring-0 dark:border-none"
            color="red"
            size="xs"
            onClick={() => deleteTask(id)}
          >
            <HiTrash className="mr-2 h-5 w-5" />
            <p>Delete</p>
          </Button>
        </Button.Group>
      </div>
    </Card>
  );
}

export default Task;
