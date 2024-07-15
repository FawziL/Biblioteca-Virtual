import React, { useState } from 'react';
import api from '../../services/Api';

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users/requestPasswordReset', { email });
            alert('Te llegará un correo a tu email. Ya puedes cerrar esta ventana.');
        } catch (error) {
            console.error('Error requesting password reset', error.response?.data || error.message);
        }
    };

    return (
        <div className='container'> 
            <form onSubmit={handleSubmit}>
                <h2>Recuperar Contraseña</h2>
                <p>Coloca tu correo para poder enviarte el código de reset.</p>
                <div className='field'>
                    <p>E-mail:</p>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='prueba@email.com'/>
                </div>
                <button type="submit">Recuperar Contraseña</button>
            </form>
        </div>
    );
};

export default RequestPasswordReset;
