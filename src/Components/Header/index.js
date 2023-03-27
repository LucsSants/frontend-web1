import React, { useContext } from 'react'
import { Context } from '../../Context/AuthContext';
import UserDeatils from '../UserDeatils';

import './index.css'

function Header() {
  const { authenticated } = useContext(Context);
  
  return (
    <div className='index-container'>
      <div>
        {authenticated && <p className='nothing'/>}
      </div>
      <h1>Torneios 🏆</h1>
      <div>
        {authenticated &&  <UserDeatils/>}
      </div>
    </div>
  )
}
 export default Header


