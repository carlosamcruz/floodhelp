import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import Create from './create/page';
import Home from './page';

//import './App.css';
import NotFound from './Pages/NotFound';
import RootLayout from './Pages/RootLayout';
//import Create from './create/page'
//import { useEffect } from 'react';

function App() {

  // Redirect adjusting
  /*
  useEffect(() => {
    if(window.location.pathname === '/'){
      window.location.href = `${window.location.origin}/${process.env.REACT_APP_REPOSITORY}`
      return;
    }
  },[])

  */

  const routesDef = createRoutesFromElements(
    <Route element={<RootLayout/>}>
      <Route path='/' element={<Home />}/>
      <Route path='/create' element={<Create />}/>
      <Route path='/*' element={<NotFound/>}/>
    </Route>
  )

  //const router = createBrowserRouter(routesDef, { basename: '/flhelp' });

  const router = createBrowserRouter(routesDef);
  return (

      <div>
            <RouterProvider router={router}/>
      </div> 

  );
}

export default App;

/*
import React from 'react';
//import logo from './logo.svg';
//import './App.css';

import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <>

      <Header/>

      <div className="container">

        <div className="row ps-5">
          <p className="lead m-4"> Ajude vítimas de desastres natuais </p>

        </div>
        <div className="p-4 mx-5">

        </div>

        <Footer/>

      </div>

    </>
  );
}

export default App;


*/