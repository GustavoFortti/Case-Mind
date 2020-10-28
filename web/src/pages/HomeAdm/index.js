import React, { useState ,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css'

function HomeAdm() {
    const history = useHistory();

    const [ users, setUsers ] = useState([]);

    const id = localStorage.getItem('user');
    
    useEffect(() => {
        api.get('/user/adm').then(response => {
            setUsers(response.data);
        })
    }, [id]);


    const handleUpdate = () => {
        history.push("/user/update")
    }
   
    const handleExit = () => {
        api.put(`/user/online/${id}`, {online: "1"})
        history.push("/")
    }

    const handleUpLevel = (event, Id) => {
        const aux = event.target.value;
        const level = (aux == 999 ? 0 : aux == 1 ? 999 : aux == 0 ? 1 : 0 );
        const data = {
            level: `${level}`,
        }
        api.put(`/user/adm/${Id}`, data);
    }


    return (
        <div id='adm'>
            <header id='admHead'>
                <h1>Administrador</h1>
            </header>
            <ul id='users'>
                {users.map(user => (
                    <li key={user.id} id='info'>
                        <div>
                            <button value={user.level} id='level' onClick={event => handleUpLevel(event, user.id)} > + </button>
                            <img id='perfil' src="https://avatars3.githubusercontent.com/u/53984056?s=460&u=a4da708f836c139adffed7a64912f553ebd63a8b&v=4" alt=""/>
                        </div>
                        <div>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>{user.cpf}</p>
                        </div>
                        <div id='access'>
                            <p>Online: {user.online}</p>
                            <p>Nível: {user.level}</p>
                            <button id='butAdm' onClick={() => handleUpdate(user.id)}>Editar</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button id='butAdm' onClick={handleExit}>Sair</button>
        </div>
    )
}

export default HomeAdm;