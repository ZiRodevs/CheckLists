import React, { useState, useReducer } from 'react';
// import Counter from './features/counter/Counter';
// import useFetch from './hooks/useFetch';
// import Users from './features/users/Users';
import TasksList from './features/tasks/TasksList';
import AddTask from './features/tasks/AddTask';
import Layout from './layout/Layout';
import HeaderTitle from './features/tasks/HeaderTitle';
import { DarkThemeToggle, Flowbite, Spinner } from 'flowbite-react';
import ToastMessage from './features/tasks/ToastMessage';
import { uuid } from './utils/uuid';
import { getCustomTimestamp as timestamp } from './utils/timestamp';

/*
*todos:
//todo 1: Implement edit functionality [ X ]
todo 2: Add priority to each card [ ]
todo 3: Add modal with inner content. detailed content [ ]
todo 4: Refactor the app and implement useReducer instead of multiple useStates [ ]
todo 5: When editig a task, focus on the relevant task [ ]
todo 6: Save the current state on local storage and retrive it when the app firstly runs [ ]
todo 7: Add an export to excel/ csv option [ ]
todo 8: Add copy to clipboard option [ ]
todo 9: Add share on whatsapp option [ ]
todo 10: Wrtie a discard function to cancel the editing
* next phase:
? Add Registration and login page
? Add backend services via node.js and express
? Save the user data in mongoDB Atlas
? Create different tasks for different users
? Create an option to have a list of tasks
? Implemnt redux toolkit
? Implemnt react query
? Migrate to next.js
! Bugs and issues:
! When deleting all items the text value remains in the input box
! Fix any TypeScript errors
! Remove unnecessary comment and console logs
! if error appears scroll to top

*/

// const initialState = [];

// const tasksReducer = (tasks, action) {

// }

function App(): JSX.Element | undefined {
  // const { data, error, isLoading } = useFetch('https://dummyjson.com/users');

  // const [tasksState, dispatch] = useReducer(tasksReducer, initialState)

  const [tasks, setTasks] = useState<
    {
      text: string;
      id: string;
      done: boolean;
      createdAt: string;
      isEditing: boolean;
    }[]
  >([]);

  const [errorToast, setErrorToast] = useState<boolean>(false);
  const [loadingSpinner, setLoadingSpinner] = useState<boolean>(false);

  // add new task
  const addTaskHandler = (text: string) => {
    setTasks((prevTasks) => {
      return [
        {
          text,
          id: uuid(),
          done: false,
          createdAt: timestamp(),
          isEditing: false,
        },
        ...prevTasks,
      ];
    });
  };

  // delete task
  const deleteTaskHandler = (id: string) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== id);
    });
  };

  // delete all tasks
  const deletAllHandler = () => setTasks([]);

  // change task editing status
  const changeEditingStatusHandler = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isEditing: !task.isEditing,
          };
        }
        return task;
      })
    );
  };

  const changeEditingTextHandler = (id: string, newText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            text: newText,
          };
        }
        return task;
      })
    );
  };

  // change task checkbox status and strikethrogh
  const changeTaskStatusHandler = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        }
        return task;
      })
    );
  };

  // change loading spiiner status
  const loadingSpinnerHandler = (status: boolean) => {
    setLoadingSpinner(status);
  };

  return (
    <>
      <Flowbite>
        <DarkThemeToggle className="ml-4 mt-4 border dark:border focus:ring-0" />

        <div
          className="App dark:bg-gray-900"
          onBlur={() => setErrorToast(false)}
        >
          {/* Redux Boilerplate */}
          {/* <Counter /> */}

          {/*   <Users data={data} error={error} isLoading={isLoading} /> */}
          <Layout>
            {errorToast && (
              <ToastMessage toastText="Can't add task with an empty text" />
            )}
            <HeaderTitle
              title="Tasks App"
              subtitle='"Stay organized and accomplish more with our simple tasks app."'
            />
            {loadingSpinner && <Spinner size="xl" className="mb-4" />}
            {tasks.length > 0 ? (
              <TasksList
                tasksData={tasks}
                deleteTask={deleteTaskHandler}
                changeTaskStatus={changeTaskStatusHandler}
                changeEditingStatus={changeEditingStatusHandler}
                changeEditedText={changeEditingTextHandler}
              />
            ) : (
              <div className="mb-4 font-light dark:text-white ">
                No tasks yet...
              </div>
            )}
            <AddTask
              helperText="Enter task description, click add. Manage your tasks easily."
              placeHolderText="Enter your task description..."
              addTaskHandler={addTaskHandler}
              deletAllHandler={deletAllHandler}
              errorHandler={setErrorToast}
              spinnerStatus={loadingSpinnerHandler}
            />
          </Layout>
        </div>
      </Flowbite>
    </>
  );
}

export default App;
