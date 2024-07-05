import React, { useState, useContext } from 'react';
import api from '../services/Api';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../services/AuthProvider';

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
      
      // Navegar a la página principal
      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión', error.response?.data || error.message);
    }
  };

  return (
    <div className='container'> 
      <form onSubmit={handleSubmit}>
      <h2>Login</h2>
        <div>
          <p>Email:</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <p>Password:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Already haven't an account? Register</Link>
    </div>
  );
};

export default Login;
