import './App.css';
import React, { lazy, Suspense } from 'react';
import './Asset/main.css'
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/styles';
import { theme } from './Auth/Theme';
import Loadable from 'react-loadable';
// import SignUp from './Auth/SignUp';
// import Login from './Auth/Login';
// const Login = lazy(() => import('./Auth/Login'));
// const SignUp = lazy(() => import('./Auth/SignUp'));
const Loading = () => <div>Loading...</div>;

const Login = Loadable({
  loader: () => import('./Auth/Login'),
  loading: Loading,
});

const SignUp = Loadable({
  loader: () => import('./Auth/SignUp'),
  loading: Loading,
});
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
