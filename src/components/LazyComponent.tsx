import React, { Suspense } from "react";

interface LazyComponentData{
  name:string
}
const LazyComponent:React.FC<LazyComponentData>=({name})=>{  
  const Lazy = React.lazy(() => import(name));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {Lazy && <Lazy />}
    </Suspense>
  );
};

export default LazyComponent