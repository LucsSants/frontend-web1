import { useState, useEffect } from 'react';
import api from '../../api';
import history from '../../history';
import {toast} from 'react-hot-toast'


export default function useAuth() {
  
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categirias,setCategorias] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);
  
  async function handleLogin(userName, userPassword) {
    setLoading(true)
     await api.post('/login',{
      "usuTxLogin":userName,
      "usuTxSenha":userPassword
    }).then(async res => {
      localStorage.setItem('token', JSON.stringify(res.data));
      api.defaults.headers.Authorization = `Bearer ${res.data}`;
      const {data: usuario} = await api.get(`/usuario/${userName}`)
      setAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(usuario));
      setLoading(false)
      history.push('/torneios');
    }).catch((errorr) => {
      toast.error("Usuário ou senha Incorretos")
      setLoading(false)
      
    })
        
  }

  async function handleCreate(userNome, userLogin, userSenha) {
    await api.post('/usuario', {
      "usuTxNome": userNome,
      "usuTxLogin": userLogin,
      "usuTxSenha": userSenha
    }).then( res => {
      if(res.data.codigo == 200) {
        toast.success(res.data.mensagem);
        history.push('/login')
      } else {
        toast.error(res.data.mensagem);
      }
    }
    ).catch((err)=> {
      toast.error(err.response.data.errors[0].defaultMessage,);
      
    })
  }
 

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }

async function getCategories(torId) {
  const {data} = await api.get(`/categoria/${torId}`)
  setCategorias(data)
}
  
  return { authenticated, loading, categirias, handleLogin, handleLogout, handleCreate, getCategories };
}