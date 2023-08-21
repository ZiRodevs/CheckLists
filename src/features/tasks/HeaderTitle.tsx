import React from 'react';

type Props = {
  title: string;
  subtitle: string;
};

const HeaderTitle = ({ title, subtitle }: Props) => {
  return (
    <>
      <div className="mb-1 mt-20 text-2xl font-light dark:text-white font-mono">
        {title}
      </div>
      <div className="mb-8 font-light mt-6 dark:text-white ">{subtitle}</div>
    </>
  );
};

export default HeaderTitle;
