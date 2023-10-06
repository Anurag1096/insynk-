import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home'
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import CategoryExpense from './pages/CategoryList';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/my-app" element={<Home/>}/>
      <Route path="/my-app/add" element={<AddExpense />} />
        <Route path="/my-app/edit" element={<EditExpense />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
