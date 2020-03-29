import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
    const [id, setId] = useState('');
    const [errors, setErrors] = useState(new Map());
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            handleErros(err);
        }
    }

    function handleErros(e) {
        if (!e.response) {
            alert('Oops! Ocorreu um erro desconhecido!');
        } else {
            const { details } = e.response.data;
            const errorsMap = new Map();
            details.forEach(detail => {
                errorsMap.set(detail.path[0], detail.message);
            });
            setErrors(errorsMap);
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Here" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        maxLength={8}
                    />
                    <p className="errors">{errors.get("id")}</p>

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>

    );
}