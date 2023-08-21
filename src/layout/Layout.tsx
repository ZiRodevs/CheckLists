import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div className="flex flex-col items-center h-full">{children}</div>;
};

export default Layout;
