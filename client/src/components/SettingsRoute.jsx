import { Navigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const SettingsRoute = ({ children }) => {
    const { username } = useParams();
    const { user } = useUser();

    if (!user || user.user !== username) {
        return <Navigate to={`/perfil/${username}`} />;
    }

    return children;
};

export default SettingsRoute;