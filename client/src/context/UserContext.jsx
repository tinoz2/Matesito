import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { loggedRequest, logoutRequest } from '../auth/axiosAPI';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState('');

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
        userId
    }), [user, logout, userId]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
