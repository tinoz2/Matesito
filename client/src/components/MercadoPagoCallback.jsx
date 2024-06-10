import React, { useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

const MercadoPagoCallback = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            axios.post('https://matesito-production.up.railway.app/mp/callback', { code, user: user.user })
                .then(response => {
                    console.log('Conexión exitosa', response.data);
                    navigate('/perfil');
                })
                .catch(error => {
                    console.error('Error al conectar con MercadoPago', error);
                });
        }
    }, [user, navigate]);

    return <div>Procesando la conexión con MercadoPago...</div>;
};

export default MercadoPagoCallback;
