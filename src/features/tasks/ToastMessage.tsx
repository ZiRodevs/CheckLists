import React from 'react';
import { Toast } from 'flowbite-react';
import { HiExclamation } from 'react-icons/hi';

type Props = {
  toastText: string;
};

const ToastMessage = ({ toastText }: Props) => {
  return (
    <Toast className="mb-7">
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
        <HiExclamation className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{toastText}</div>
      <Toast.Toggle />
    </Toast>
  );
};

export default ToastMessage;
