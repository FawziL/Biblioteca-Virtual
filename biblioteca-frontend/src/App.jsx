import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Books from './pages/Books';
import CreateBook from './pages/createBook';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import Navbar from './components/NavBar/Navbar';
import PrivateRoute from './services/PrivateRoute';
import SearchBooks from './components/SearchBook/SearchBooks';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/search" element={<SearchBooks />} />
        <Route path="/newBook" element={<PrivateRoute><CreateBook /></PrivateRoute>} />
        <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />
        <Route path="/editBook/:id" element={<PrivateRoute><EditBook /></PrivateRoute>} />
        <Route path="/showBook/:pdfLocation" element={<PrivateRoute><ShowBook /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
