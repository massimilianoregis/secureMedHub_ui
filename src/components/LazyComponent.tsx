import React, { Suspense } from "react";

const LazyComponent:React.FC<any>=({name,...all})=>{    
  console.log('=============',name,'=============');
  const Lazy = React.lazy(() => import(name));    
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {Lazy && <Lazy {...all}/>}
    </Suspense>
  );
};

export default LazyComponent