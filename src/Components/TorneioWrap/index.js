import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import Modal from 'react-modal'
import api from '../../api'


import './index.css'

Modal.setAppElement("#root")



function TorneioWrap({tor}) {


  const [categorias,setCategorias] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [user, setUser] = useState({})

  const [isOpen, setIsOtpen] = useState(false)

  const [selectCat, setSelectedCat] = useState({value :'DEFAULT'})
  const [selectUser, setSelectedUser] = useState({value :'DEFAULT'})

   async function openModal(torId) {
    const {data: categoria} = await api.get(`/categoria/${torId}`)
    const {data : usuario} = await api.get('/usuario/todos')

    setCategorias(categoria)
    setUsuarios(usuario.filter(usu => usu.usuNrId !== user.usuNrId))

     setIsOtpen(true)
    
  }
  
  function closeModal() {
    setIsOtpen(false)
  }

  function handleCatChange(event) {
    setSelectedCat(JSON.parse(event.target.value))
  }

  function handleUserChange(event) {
    setSelectedUser(JSON.parse(event.target.value))
  }

  async function handleSumbit() {
      if(selectCat.value ==="DEFAULT") {
        toast.error("Por favor preencha a categoria!")
        return
      }

      if (selectUser.value ==="DEFAULT") {
        toast.error("Por favor escolha sua dupla!")
        return
      }

    await api.post('/inscricao', {
      "categoria": selectCat,
      "usuarioUm": user,
      "usuarioDois": selectUser
    }).then(res => {
      toast.success('Inscrito com sucesso!')
    }
    ).catch((err)=> {
      console.log(err)
    })
    closeModal()
    
  }

  useEffect(() => {
    (async () => {
        await setUser(JSON.parse(localStorage.getItem('user')))
    })()
    
  }, []);

  return (
    <>
    <Toaster/>
    <button onClick={()=> openModal(tor.torNrId)} className='torneio-container'>
      <h3>{tor.torTxNome}</h3>
     </button>

     <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      overlayClassName="modal-overlay"
      className="modal-content"
     >
      <h2>{tor.torTxNome}</h2>
      <h4>Inscreva-se</h4>
    
    <div className='modal-wrap'>
      
      <div className='select-wrap'>
        <label>Categoria:</label>
          <select className='select' value={selectCat.value} onChange={handleCatChange}>
          <option  value="DEFAULT" disabled hidden>Selecione...</option>
            {categorias.map((cat) => (
              <option key={cat.catNrId} value={JSON.stringify(cat)} >{cat.catTxNome}</option>
              ))}
          </select>
      </div>

      <div className='select-wrap'>
        <label>Dupla:</label>
          <select className='select' value={selectUser.value} onChange={handleUserChange}>
          <option value="DEFAULT" disabled hidden>Selecione...</option>
            {usuarios.map((usu) => (
              <option key={usu.usuNrId} value={JSON.stringify(usu)} >{usu.usuTxLogin}</option>
              ))}
          </select>
      </div>
      
      
    </div>
    <div className='buttons-wrap'>
        <button className='button-close' onClick={closeModal}>Fechar</button>
        <button className='button-create' onClick={handleSumbit}>Inscrever-se</button>
      </div>
      
     </Modal>
    </>
  )
}
 export default TorneioWrap


