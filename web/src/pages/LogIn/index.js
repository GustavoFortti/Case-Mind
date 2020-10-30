import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { logIn } from '../../services/auth'
import AuthContext from '../../context/auth'

import './styles.css'

function LogIn() {

    const history = useHistory();

    const { signed } = useContext(AuthContext);
    console.log(signed);
    console.log("signed");


    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const { log, password } = formData;
        
        const response = await logIn();

        await api.post('user/auth', { log, password }).then(resp =>{
            localStorage.setItem('user', resp.data.user.id);
            api.put(`/user/online/${resp.data.user.id}`, {online: "0"})
            const data = resp.data.user.level;
            const token = "jf942hjf984y3rf98735hqgf98u43gf"
            if(data === "1") {
                return  history.push('/user/default')
            } else if(data === "999") {
                return  history.push('/user/adm')
            }
        })
            
    }

    const [formData, setFormData] = useState({
        log: '',
        password: '',
    })

    return (
        <div id="page">
            <header>
                <h1>Login</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <input 
                        type="text"
                        name="log"
                        id="log"
                        onChange={handleInputChange}
                        placeholder="Email or CPF"
                    />
                </div>
                <div className="field">
                    <input 
                        type="text"
                        name="password"
                        id="password"
                        onChange={handleInputChange}
                        placeholder="Password"
                    />
                </div>
                <div>
                    <button type="submit">
                        Sing In
                    </button>
                    <Link to="/register" className="register">
                        Register
                    </Link>
                </div>
            </form>            
        </div>
    );
}

export default LogIn;