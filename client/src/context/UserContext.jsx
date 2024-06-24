import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { loggedRequest, logoutRequest } from '../auth/axiosAPI';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState('');
    const [userLoading, setUserLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        try {
            const res = await loggedRequest();
            setUser(res.data);
            if (res.data) {
                const id = res.data.id;
                setUserId(id);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setUserLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const logout = useCallback(async () => {
        try {
            await logoutRequest();
            setUser(null);
            setUserId('');
            setUserLoading(true);
            document.cookie = "mercadopago=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } catch (error) {
            console.log(error);
        }
    }, []);

    const contextValue = useMemo(() => ({
        user,
        setUser,
        logout,
        userId,
        userLoading
    }), [user, logout, userId, userLoading]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};