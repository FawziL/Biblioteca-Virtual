import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Search from './pages/Search/Search';
import Books from './pages/AdminBooks/Books';
import CreateBook from './pages/CreateBook/CreateBook';
import ShowBook from './pages/ShowPDF/ShowBook';
import EditBook from './pages/EditBook/EditBook';
import FavoriteBooks from './pages/FavoriteBooks/FavoriteBooks.jsx';
import RequestPasswordReset from './pages/RequestPassword/RequestPassword.jsx';
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';
import Navbar from './components/NavBar/Navbar';
import {PrivateRoute, PrivateRouteAdmin} from './services/PrivateRoute';
import { AuthProvider } from './services/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/search" element={<Search />}/>
                    <Route path="/showBook/:id" element={<ShowBook />} />
                    <Route path="/requestPasswordReset" element={<RequestPasswordReset />}/>
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/favoriteBooks" element={<PrivateRoute><FavoriteBooks /></PrivateRoute>} />
                    <Route path="/newBook" element={<PrivateRouteAdmin><CreateBook /></PrivateRouteAdmin>} />
                    <Route path="/books" element={<PrivateRouteAdmin><Books /></PrivateRouteAdmin>} />
                    <Route path="/editBook/:id" element={<PrivateRouteAdmin><EditBook /></PrivateRouteAdmin>} />
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </Router>
        </AuthProvider>
    );
}

export default App;
