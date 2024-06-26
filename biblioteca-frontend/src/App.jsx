import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Books from './pages/Books';
import CreateBook from './pages/createBook';
import ShowBook from './pages/ShowBook';
import Navbar from './components/Navbar';
import PrivateRoute from './services/PrivateRoute';

/*
import BookDetail from './pages/BookDetail';
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';*/

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/showBook" element={<ShowBook />} />
        <Route path="/newBook" element={<PrivateRoute><CreateBook /></PrivateRoute>} />
        <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
