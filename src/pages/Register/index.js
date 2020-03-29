import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Modal from 'react-modal';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg'

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [errors, setErrors] = useState(new Map());

    const [isModalOpen, setIsModalOpen] = useState(false);

    const history = useHistory();


    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            await api.post('/ongs', data);
            alert(`Cadastro realizado com sucesso! Enviamos sua ID de acesso para: ${email}`);
            history.push('/');
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
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color='#E02041' />
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        maxLength={80}
                    />
                    <p className="errors">{errors.get("name")}</p>

                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        maxLength={80}
                    />
                    <p className="errors">{errors.get("email")}</p>

                    <input
                        placeholder="WhatsApp +99 99 9999 9999"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        maxLength={16}
                    />
                    <p className="errors">{errors.get("whatsapp")}</p>

                    <div className="input-group">

                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            maxLength={80}
                        />
                        <p className="errors">{errors.get("city")}</p>

                        <input
                            placeholder="UF"
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            style={{ width: 80 }}
                            maxLength={2}
                        />
                        <p className="errors">{errors.get("uf")}</p>

                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}