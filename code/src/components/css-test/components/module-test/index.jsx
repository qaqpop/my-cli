import React from 'react';
import  CssModule from './index.module.css'

const CssLoaderModuleTest= () => {
  console.log(CssModule)
  return (
    <>
      <div className={CssModule.classBlue}> css-loader-module-test </div>
    </>
  );
};
export default CssLoaderModuleTest;
