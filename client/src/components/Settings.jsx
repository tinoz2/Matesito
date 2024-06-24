import { useUser } from '../context/UserContext'

const Settings = () => {

    const { logout, user } = useUser()

    const handleMercadoPago = async () => {
        try {
            window.location.href = `https://matesito-production.up.railway.app/mp/callback?token=${userId}`;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button onClick={logout}>Logout</button>
            {
                user.mercadopagoAccessToken ? <p>Cuenta de Mercado Pago conectada!</p> : <button onClick={handleMercadoPago}>Conectar Mercado Pago</button>
            }
        </div>
    )
}

export default Settings