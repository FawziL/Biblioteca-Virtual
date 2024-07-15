import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/Api';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ResetPassword = () => {
    const query = useQuery();
    const token = query.get('token');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            await api.post('/users/resetPassword', { token, newPassword });
            alert('Password has been reset');
            navigate('/login');
        } catch (error) {
            console.error('Error resetting password', error.response?.data || error.message);
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h2>Nueva contraseña</h2>
                <p>Coloca tu nueva contraseña</p>
                <div className='field'>
                    <p>Nueva Contraseña:</p>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder='password'/>
                </div>
                <div className='field'>
                    <p>Confirmar Contraseña:</p>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder='password'/>
                </div>
                <button type="submit">Resetear Contraseña</button>
            </form>
        </div>
    );
};

export default ResetPassword;
