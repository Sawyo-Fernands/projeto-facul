import { useState } from 'react'
import './App.scss'
import Modal from 'react-modal'
import { AiFillDelete, AiOutlineClose, AiOutlineEdit, } from 'react-icons/ai' 
import { IoMdAdd } from 'react-icons/io'
import {GiDoubleDragon} from 'react-icons/gi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'500px'
  },
};

function App() {

  const [openModal, setOpenModal] = useState(false)
  const [ nomeJogador,setNomeJogador ] = useState('')
  const [ id,setId ] = useState(null)
  const [ selecao,setSelecao ] = useState('')
  const [ altura,setAltura ] = useState('')
  const [ peso,setPeso ] = useState('')
  const [isEdit,setIsEdit] = useState(false)
  const [ listData,setListData ] = useState([])
  const [ figurinhasRepetidas,setFigurinhasrepetidas] = useState([])

  const listaOrdernada = listData.sort(function(a, b) {
    if(a.selecao < b.selecao) {
      return -1;
    } else {
      return true;
    }
  });

  function handleSubmit(e){
  const idRandom=(num )=>Math.floor( Math.random() * num )
    e.preventDefault()

    if(!nomeJogador){
      toast.warn('Preencha todos os campos!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return
    }
    if(!selecao){

      toast.warn('Preencha todos os campos!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return
    }
    if(!altura){

      toast.warn('Preencha todos os campos!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return
    }
    if(!peso){

      toast.warn('Preencha todos os campos!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return
    }
   
    setListData([...listData,{
      id:idRandom(999999),
      jogador:nomeJogador,
      selecao:selecao,
      altura:altura,
      peso:peso
    }])

    closeModal()
  }

  function handleDelete(idFigurinha){
    const newList = listData.filter(element => element.id !== idFigurinha)
    setListData(newList)
  }

  function handleEdit(e){
    e.preventDefault()

    const newList = listData.filter(element => element.id !== id)

    newList.push({
        id:id,
        jogador:nomeJogador,
        selecao:selecao,
        altura:altura,
        peso:peso
      })
    setListData(newList)

    closeModal()

  }

function pegarFigurinhasRepetidas(){

  let results = [];
  for (var i = 0; i < listaOrdernada.length - 1; i++) {
      if (listaOrdernada[i + 1].nomeJogador == listaOrdernada[i].nomeJogador && 
        listaOrdernada[i + 1].selecao == listaOrdernada[i].selecao && 
        listaOrdernada[i + 1].peso == listaOrdernada[i].peso && 
        listaOrdernada[i + 1].altura == listaOrdernada[i].altura 
        ) {
          results.push(listaOrdernada[i]);
      }
  }
if(results.length == 0){
  toast.warn('Não existem figurinhas duplicadas!', {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    return
}

  setFigurinhasrepetidas(results)
}


  function closeModal(){
            setOpenModal(false)
            setNomeJogador('')
            setSelecao('')
            setAltura('')
            setPeso('')
            setId(null)
            setIsEdit(false)
  }

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />

    <Modal
        isOpen={openModal}
        close
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <header className='headerModal'>
          <h4> Figurinha</h4>
          <AiOutlineClose size={20} style={{cursor:'pointer'}} onClick={closeModal} />
        </header>
        <main className='mainContainerForm'>
          <form action="">
            <div className='containerInput'>
            <label htmlFor="">Nome do Jogador</label>
            <input type="hidden"  value={id}  />
            <input type="text"  value={nomeJogador} onChange={(e)=>setNomeJogador(e.target.value)} />
            </div>
           <div className='containerInput'>
           <label htmlFor="">Seleção</label>
            <input type="text" value={selecao} onChange={(e)=>setSelecao(e.target.value)}/>
           </div>
            <div className='containerInput'>
            <label htmlFor="">Altura</label>
            <input type="text" value={altura} onChange={(e)=>setAltura(e.target.value)}/>
            </div>
            <div className='containerInput'>
            <label htmlFor="">Peso</label>
            <input type="text" value={peso} onChange={(e)=>setPeso(e.target.value)}/>
            </div>
            <div className='buttonSend'>
              <button type='submit' onClick={(e)=>{
                isEdit ? handleEdit(e) : handleSubmit(e)
              }}>Adicionar</button>
            </div>
            
          </form>

        </main>
      </Modal>
    <header className="header">
      <h1>World Cup</h1>
      <div style={{display:'flex',gap:'0.2rem'}}>
        <button onClick={()=>setOpenModal(true)}><IoMdAdd size={20} /> Novo</button>
        {
          figurinhasRepetidas.length == 0 ? (
        <button  onClick={pegarFigurinhasRepetidas} ><GiDoubleDragon size={20} /> Fig. Duplicadas</button>
          ) : (
            <button  onClick={()=>setFigurinhasrepetidas([])} ><GiDoubleDragon size={20} /> Lista Original</button>
          )
        }
        
      </div>
    </header>
      <div className="mainContainer">
            {
              figurinhasRepetidas.length > 0 ? (
                figurinhasRepetidas.map((element,key) =>(
                  <div key={key} className='cardComponent' >
                  <h5>JOGADOR: <span>{element.jogador}</span></h5>
                  <h5>SELEÇÂO: <span>{element.selecao}</span></h5>
                  <h5>PESO: <span>{element.peso}</span></h5>
                  <h5>ALTURA: <span>{element.altura}</span></h5>
                  <div style={{display:'flex',gap:'0.2rem'}}>
                  <button  onClick={()=>handleDelete(element.id)}><AiFillDelete size={20}/> Excluir</button>
                    <button onClick={()=>
                      {
                        setIsEdit(true)
                        setOpenModal(true)
                        setNomeJogador(element.jogador)
                        setSelecao(element.selecao)
                        setAltura(element.altura)
                        setPeso(element.peso)
                        setId(element.id)
                      }
                      }><AiOutlineEdit  size={20} /> Editar</button>
                  </div>
                  
                  </div>
                ))
              ) : (
                listaOrdernada.map((element,key) =>(
                  <div key={key} className='cardComponent' >
                  <h5>JOGADOR: <span>{element.jogador}</span></h5>
                  <h5>SELEÇÂO: <span>{element.selecao}</span></h5>
                  <h5>PESO: <span>{element.peso}</span></h5>
                  <h5>ALTURA: <span>{element.altura}</span></h5>
                  <div style={{display:'flex',gap:'0.2rem'}}>
                  <button onClick={()=>
                      {
                        setIsEdit(true)
                        setOpenModal(true)
                        setNomeJogador(element.jogador)
                        setSelecao(element.selecao)
                        setAltura(element.altura)
                        setPeso(element.peso)
                        setId(element.id)
                      }
                      }><AiOutlineEdit  size={20} /> Editar</button>
                  <button  onClick={()=>handleDelete(element.id)}><AiFillDelete size={20}/> Excluir</button>
                  
                  </div>
                  </div>
                ))
              )
              
            }
      </div>
    </>
 
  )
}

export default App
