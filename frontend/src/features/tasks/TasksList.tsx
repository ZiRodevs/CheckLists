import React, { useRef } from 'react';
import Task from './Task';

type DeleteTaskHandlerType = (text: string) => void;
type ChangeTaskStatusHandlerType = (id: string) => void;

type Props = {
  tasksData: task[];
  deleteTask: DeleteTaskHandlerType;
  changeTaskStatus: ChangeTaskStatusHandlerType;
  changeEditingStatus: (id: string) => void;
  changeEditedText: (id: string, text: string) => void;
};

type task = {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
  isEditing: boolean;
};

const TasksList = ({
  tasksData,
  deleteTask,
  changeTaskStatus,
  changeEditingStatus,
  changeEditedText,
}: Props) => {
  return (
    <>
      <div className="p-4">
        {tasksData.map((task) => {
          return (
            <Task
              key={task.id}
              {...task}
              deleteTask={deleteTask}
              changeTaskStatus={changeTaskStatus}
              changeEditingStatus={changeEditingStatus}
              changeEditedText={changeEditedText}
            />
          );
        })}
      </div>
    </>
  );
};

export default TasksList;
