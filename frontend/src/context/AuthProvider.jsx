import { useState } from 'react';
import { AuthContext } from './index.js';

const AuthProvider = ({ children }) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(userData ? userData.username : null); 

    const logIn = (userData) => {
        const username = userData.username;
        localStorage.setItem('user', JSON.stringify(userData));
        setUser({ username });
      };

    const logOut = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ logOut, logIn, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;