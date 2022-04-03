import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// importing general components
import { Navbar, Background } from './components';
import { Login, Register } from './views';
import './App.css';
import 'antd/dist/antd.css';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authAction'
import { useDispatch } from 'react-redux';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.token) {
      dispatch(setCurrentUser())
    }
  }, [])
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Background />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
