import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/Api';
import { toast } from 'react-toastify';

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
            toast.error("Las contraseñas no coinciden!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        try {
            await api.post('/users/resetPassword', { token, newPassword });
            toast.success('Tu contraseña ha sido modificada.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            
        } catch (error) {
            const errorMessage = error.response.data.error || 'Ocurrió un error al modificar la contraseña.';
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
