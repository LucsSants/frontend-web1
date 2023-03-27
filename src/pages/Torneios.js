import React, { useState, useEffect, useContext } from 'react';

import './torneios.css'
import api from '../api';
import TorneioWrap from '../Components/TorneioWrap';
import { Context } from '../Context/AuthContext';

export default function Torneios() {
  const { handleLogout, loading, authenticated } = useContext(Context);
  const user = localStorage.getItem('user')
  const [torneios, setTorneios] = useState([]);
  const [usuarios, setUsuarios] = useState({})

  useEffect(() => {
    (async () => {
      if (!loading) {
        await api.get('/torneio')
        .then(res => {
          setTorneios(res.data)
          setUsuarios(JSON.parse(localStorage.getItem('user')))
        })
          .catch((err)=> {
            alert("Sessão expirada!")
            handleLogout()
          });
          
      }  
    })()
    
  }, []);

  return (
    <> 
      <div className='torneios-container'>

        {torneios.map((torneio) => (
          <TorneioWrap key={torneio.torNrId} tor={torneio}/>
          ))}
      </div>
      

      
    </>
  );
}
