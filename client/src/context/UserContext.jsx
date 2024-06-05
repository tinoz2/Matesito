import { createContext, useState, useContext, useEffect } from 'react';
import { loggedRequest } from '../auth/axiosAPI';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await loggedRequest();
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);

    console.log(user)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};