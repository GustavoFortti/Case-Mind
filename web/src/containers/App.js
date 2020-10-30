import React, {useState} from 'react'
import Routes from '../routes/index'
import { AuthProvider } from '../context/auth';

import '../styles/global.css'

const App = () => {
    const [signed, setSigned] = useState(false);


    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
};

export default App;