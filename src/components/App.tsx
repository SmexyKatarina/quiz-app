import React from 'react';
import '../css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Quizzes from '../pages/Quizzes';
import Error from '../pages/Error';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="quizzes" element={<Quizzes />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
