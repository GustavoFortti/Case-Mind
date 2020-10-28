import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api'
import './styles.css'

function EditUser() {
    const history = useHistory(0);
    const id = localStorage.getItem('id');

    useEffect(() => {
        api.get(`/user/${id}`).then( response => {
            let {name, email, cpf} = response.data;
            setName(name)
            setEmail(email)
            setCpf(cpf)
        })
      }, []);
    
    var [ name, setName ] = useState('');
    var [ email, setEmail ] = useState('');
    var [ cpf, setCpf ] = useState('');

    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            api.put(`/user/${id}`, {name, email, cpf})
            history.goBack()
            
        } catch {
            console.alert('error');
        }
    }

    const handleBack = () => {
        history.goBack()
    }

    return ( 
        <div id='page-update'>
            <header id='title'>
                <h1>Update</h1>
            </header>
            <form onSubmit={handleSubmit} id='edit'>
                <div className="fieldEdit">
                    <label htmlFor="name">Nome</label>
                    <input 
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="fieldEdit">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="fieldEdit">
                    <label htmlFor="cpf">CPF</label>
                    <input 
                        type="text"
                        name="cpf"
                        id="cpf"
                        value={cpf}
                        onChange={(event) => setCpf(event.target.value)}
                    />
                </div>
                <div id='buttons'>
                    <button  id='butUp' type="submit">
                        Save
                    </button>
                    <button id='butUp' onClick={handleBack}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditUser;