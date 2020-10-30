import { createContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../services/auth'
import api from '../services/api'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 


    const singIn = async(data) => {
        const response = await auth.logIn(data);

        console.log(response);
        return response;
    };


    return (
        <AuthContext.Provider value={{signed: false, user: {}, singIn}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;