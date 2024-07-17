import React, { useState, useContext } from 'react';
import api from '../../services/Api';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../services/AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login', { email, password });
            const { token, admin } = response.data;
            // Actualizar el estado global de autenticación
            login(token, admin);

            toast.success('Te has logeado con éxito, te redirigiremos a Home al finalizar este mensaje.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => navigate('/')
            });

        } catch (error) {
            console.error('Error al iniciar sesión', error.response?.data || error.message);
            const errorMessage = error.response.data.error || 'Error al iniciar sesión';
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <div className='container'> 
            <form onSubmit={handleSubmit}>
                <h2>Iniciar sesión</h2>
                <p>Ingresa tus credenciales para acceder a tu cuenta.</p>
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
                    <p>Contraseña:</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
                <Link to="/requestPasswordReset">Did you forget your password? Cambiar contraseña</Link>
            </form>
            <Link to="/signup">Already haven't an account? Register</Link>
        </div>
    );
};

export default Login;
