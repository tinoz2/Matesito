import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { loggedRequest, logoutRequest } from '../auth/axiosAPI';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState('');

    const fetchUser = useCallback(async () => {
        try {
            const res = await loggedRequest();
            setUser(res.data);
            if (res.data) {
                const token = res.data.id;
                setAccessToken(token);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const logout = useCallback(async () => {
        try {
            await logoutRequest();
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const contextValue = useMemo(() => ({
        user,
        setUser,
        logout,
        accessToken,
    }), [user, logout, accessToken]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
