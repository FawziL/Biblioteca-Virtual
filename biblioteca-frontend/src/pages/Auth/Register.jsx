import React, { useState } from 'react';
import api from '../../services/Api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [idCard, setIdCard] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        try {
            const response = await api.post('/users/signup', { fullName, email, password, confirmPassword, idCard });
            localStorage.setItem('token', response.data.token);
            navigate('/login');
        } catch (error) {
            console.error('Error al registrarse', error.response.data);
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h2>Registro</h2>
                <p>Ingresa tus credenciales para crear tu cuenta.</p>
                <div className='field'>
                    <p>Nombre y Apellido:</p>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                        required
                    />
                </div>
                <div className='field'>
                    <p>E-mail:</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className='field'>
                    <p>Cédula:</p>
                    <input
                        type="number"
                        value={idCard}
                        onChange={(e) => setIdCard(e.target.value)}
                        placeholder="ID Number"
                        required
                    />
                </div>
                <div className='field'>
                    <p>Contraseña:</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className='field'>
                    <p>Repetir Contraseña:</p>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
            <Link to="/login">Already have an account? Login</Link>
        </div>
    );
};

export default Register;
