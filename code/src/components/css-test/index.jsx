import React from 'react';
import CssLoaderImportTest from './components/import-test'
import CssLoaderModuleTest from './components/module-test'
import CssLoaderUrlTest from './components/url-test'
const CssTest= () => {
  return (
    <>
      <CssLoaderImportTest/>
      <CssLoaderModuleTest/>
      <CssLoaderUrlTest/>
    </>
  );
};
export default CssTest;
