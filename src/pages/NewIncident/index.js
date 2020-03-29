import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [errors, setErrors] = useState(new Map());

    const data = {
        title,
        description,
        value
    };

    async function handleNewIncident(e) {
        e.preventDefault();
        try {
            await api.post('incidents/', data, {
                headers: {
                    Authorization: ongId
                }
            });

            setErrors(new Map());
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
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color='#E02041' />
                            Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        maxLength={80}
                    />
                    <p className="errors">{errors.get("title")}</p>

                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição"
                        maxLength={400}
                    />
                    <p className="errors">{errors.get("description")}</p>

                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor em reais"
                        maxLength={10}
                    />
                    <p className="errors">{errors.get("value")}</p>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}