import React from 'react';

interface DynamicTagProps {
    item:object,
    name: string;
    children?: React.ReactNode;
    [key: string]: any;
  }
const DynamicTag: React.FC<DynamicTagProps> =  ({ name, children, ...rest }) => {  
  const CustomComponent = React.lazy(() => import(/* @vite-ignore */name));
  return (
    React.createElement(CustomComponent, { ...rest }, children)
  );
};

export default DynamicTag;