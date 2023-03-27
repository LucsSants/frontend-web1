import React, { useContext, useState } from 'react';
import './auth.css'
import { Context } from '../Context/AuthContext';
import Input from '../Components/Input';
import { Toaster } from 'react-hot-toast';
import {Link} from 'react-router-dom'

export default function Login() {
  const { authenticated, handleLogin, handleCreate } = useContext(Context);
  const [login, setLogin] = useState("")
  const [password, setPassowrd] =  useState("")

  

  return (
    <>
    <div className='container'>
      <Toaster/>
      <div className='auth-container'>
      <h3 className='title'>Login</h3>
      
      <Input
        label="Usuario"
        placeholder='Usuario'  
        value={login}
        onChange={(e)=> {setLogin(e.target.value)}}
        />

      <Input
        label="Senha"
        placeholder='Senha' 
        type='password' 
        value={password}
        onChange={(e)=> {setPassowrd(e.target.value)}}
        />
      
      <button className='form-button' type="button" onClick={()=> handleLogin(login,password)}>Entrar</button>

      <div className='create'>
        <span>
          Não possui conta?
        </span>
        <Link to={'/cadastro'}>
          Crie sua conta.
        </Link>
      </div>
      </div>
    </div>
        </>
    
    )
}