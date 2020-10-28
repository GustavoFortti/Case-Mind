import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css'

function Resgister() {

    const history = useHistory();
    
    async function handleSubmit(event) {
        event.preventDefault();

        const { name, email, cpf, password } = formData;

        const data = {
            name,
            email,
            cpf,
            password,
            online: "1",
            level: "999",
            path: "-"
        };

        console.log(data);
        
        await api.post('user', data);

        history.push('/');
    }

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        password: '',
    });

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })
    };

    return (
        <div id="page-register">
            <header>
                <h1>Register</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <input 
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleInputChange}
                        placeholder="Name"
                    />
                </div>
                <div className="field">
                    <input 
                        type="text"
                        name="email"
                        id="email"
                        onChange={handleInputChange}
                        placeholder="E-mail"
                    />
                </div>
                <div className="field">
                    <input 
                        type="text"
                        name="cpf"
                        id="cpf"
                        onChange={handleInputChange}
                        placeholder="CPF"
                    />
                </div>
                <div className="field">
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleInputChange}
                        placeholder="Password"
                    />
                </div>
                <button type="submit" id="button">
                    Create Account
                </button>
            </form>            
        </div>
    );
}

export default Resgister;