import React, { useState } from 'react';
import api from '../../services/Api';
import { toast } from 'react-toastify';

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users/requestPasswordReset', { email });
            toast.success('Te llegará un correo a tu email. Ya puedes cerrar esta ventana.', {
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
            const errorMessage = error.response.data.error || 'No se encontró el email.';
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
