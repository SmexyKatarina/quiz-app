import React from 'react';
import '../css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Quizzes from '../pages/Quizzes';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Error from '../pages/Error';
import Invalid from '../pages/Invalid';

import ProtectedRoute from './ProtectedRoute';

function App () {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="quizzes" element={<Quizzes />}/>
          <Route path="login" element={<Login />}/>
          <Route path="profile" element={
              <ProtectedRoute permissions={["USER_PROFILE"]}>
                <Profile />
              </ProtectedRoute>
          }/>
          <Route path="profile/:username" element={<Profile />}/>
          <Route path="invalid-perms" element={<Invalid />}/>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
