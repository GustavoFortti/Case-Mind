import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import AuthContext from '../../context/auth'

import './styles.css'

function LogIn() {

    const history = useHistory();

    const { signed, singIn } = useContext(AuthContext);

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const path = await singIn(formData);

        history.push(`/user/${path}`)
        
        // history.push(`/user/${way}`)

        // const { log, password } = formData;

        // const response = await logIn();

        // await api.post('user/auth', { log, password }).then(resp =>{
        //     localStorage.setItem('user', resp.data.user.id);
        //     api.put(`/user/online/${resp.data.user.id}`, {online: "0"})
        //     const data = resp.data.user.level;
        //     const token = "jf942hjf984y3rf98735hqgf98u43gf"
        //     if(data === "1") {
        //         // return  
        //     } else if(data === "999") {
        //     }
        // })
            
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