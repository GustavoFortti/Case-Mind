import React, { useState ,useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css'

function HomeDefault() {

    const history = useHistory();
    
    const id = localStorage.getItem('user');

    const [user, setUser] = useState('');

    useEffect(() => {
        api.get(`/user/${id}`).then( response => {
            setUser(response.data)
        })
      }, []);

    const handleUpdate = (id) => {
        localStorage.setItem('id', id);
        history.push("/user/update")
    }

    const handleExit = () => {
        api.put(`/user/online/${id}`, {online: "1"})
        history.push("/")
    }

    return (
        <div id="page-home">
            <header>
                <h1>{user.name}</h1>
            </header>
            <form id='bloc'>
                <div id="user">
                    <img id='perfilUser' src="https://avatars3.githubusercontent.com/u/53984056?s=460&u=a4da708f836c139adffed7a64912f553ebd63a8b&v=4" alt=""/>
                    <div id='group'>
                        <h1>{user.email}</h1>
                        <h1>{user.cpf}</h1>
                        <button id='button' onClick={() => handleUpdate(user.id)}>Editar</button>
                    </div>
                </div>
            </form>
            <button id='butDef' onClick={handleExit}>Sair</button>
        </div>
    )
}

export default HomeDefault;