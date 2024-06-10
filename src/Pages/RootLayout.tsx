import React, { Fragment } from 'react';
import { Outlet, useLocation,  } from 'react-router-dom';

import Home from '../page';
import Create from '../create/page';
import NotFound from '../Pages/NotFound';

const RootLayout = () => {
  const { pathname } = useLocation();

  console.log(process.env.REACT_APP_DOCKER, window.location.origin)
  console.log(window.location, process.env.NODE_ENV)

  console.log("pathname: ", pathname)

  const outletReturn = (
    <>
    </>
  );

  return (
    <Fragment>
      {
        pathname === '/' ? 
          <Home /> 
          : 
        pathname === '/create' ?
          <Create /> 
          :
          <NotFound />
      }

    </Fragment>
  );
};

export default RootLayout;