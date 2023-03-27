import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import {BiUserCircle} from 'react-icons/bi'
import { Context } from '../../Context/AuthContext';

function UserDeatils() {
  const [usuario, setUsuario] = useState({})
  const { handleLogout } = useContext(Context);

  useEffect(()=> {
    async function getUser() {
      await setUsuario(JSON.parse(localStorage.getItem('user')))
    }
    getUser()
  },[])
  return (
    <div className='user-wrap'>
      <BiUserCircle size={30}/>
      <span>{usuario.usuTxLogin}</span>
      <button className='logout-button' type="button" onClick={handleLogout} >Sair</button>
    </div>
  )
}
 export default UserDeatils


