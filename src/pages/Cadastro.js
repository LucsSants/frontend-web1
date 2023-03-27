import React, { useContext, useState } from 'react';
import './auth.css'
import {Toaster} from 'react-hot-toast'
import { Context } from '../Context/AuthContext';
import Input from '../Components/Input';
import { Link } from 'react-router-dom';

export default function Cadastro() {
  const { handleCreate } = useContext(Context);
  const [nome, setNome] = useState("")
  const [login, setLogin] = useState("")
  const [password, setPassowrd] =  useState("")

  

  return (
    <>
    <div className='container'>
      <Toaster/>
      <div className='auth-container'>
      <h3 className='title'>Cadastro</h3>
        <Input
        label="Nome"
        placeholder='Insira seu nome...'  
        value={nome}
        onChange={(e)=> {setNome(e.target.value)}}
        />
        <Input
        label="Usuario"
        placeholder='Crie um usuário'  
        value={login}
        onChange={(e)=> {setLogin(e.target.value)}}
        />
        <Input
        label="Senha"
        placeholder='Crie uma senha...'  
        value={password}
        type="password"
        onChange={(e)=> {setPassowrd(e.target.value)}}
        />
      <button className='form-button' type="button" onClick={() => handleCreate(nome, login, password)}>Cadastre-se</button>

      <div className='create'>
        <span>
          Já possui conta?
        </span>
        <Link to={'/login'}>
          Faça login.
        </Link>
      </div>
      </div>
      
    </div>
        </>
    
    )
}