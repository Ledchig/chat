import { useState, useMemo } from 'react';
import AuthContext from './useAuthContext.js';

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));

    const logOut = () => {
        setUserData(null);
        localStorage.clear();
    };

    const memo = useMemo(() => ({ data: userData, setUserData }), [userData]);

    return (
        <AuthContext.Provider value={{memo, logOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;