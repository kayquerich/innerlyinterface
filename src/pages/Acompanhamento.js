import { useLocation, useNavigate } from "react-router-dom"
import { InternalPage as Page } from "../components/Container"
import { Subtitle } from "../components/Text"
import { ConfirmClose } from "../components/Modal"
import profilePic from '../assets/images/perfil-static-icon.png'
import styles from '../styles/acompanhamento.module.css'
import { useState } from "react"

export default function Acompanhamento () {
    
    const location = useLocation()

    const usuario = JSON.parse(sessionStorage.getItem('usuario'))
    const [acompanhamento, setAcompanhamento] = useState(location.state)

    const navigation = useNavigate()

    const handleBack = () => {
        navigation('/profissionais')
    }

    const [showModal, setShowModal] = useState(false)
    const handleClick = () => {
        setShowModal(true)
    }

    const atualizarStatus = () => {
        setAcompanhamento({...acompanhamento, is_ativo : false})
    }

    return (
        <>
        {showModal && <ConfirmClose close={() => setShowModal(false)} token={usuario.token} id={acompanhamento.id} execute={atualizarStatus}/>}

        <Page dadosUsuario={usuario} style={{ position : 'relative' }}>

            <Subtitle>Acompanhamento</Subtitle>

            <header className={styles.header} >
                <img src={profilePic} alt="imagem estática de perfil" />
                <div className={styles.header_text} >
                    <h1>{acompanhamento.nome_profissional}</h1>
                    <p className={styles.codigo}>Codigo relação: {acompanhamento.codigo_acompanhamento}</p>
                    <p>{acompanhamento.biografia}</p>
                    <p>Inicio: {acompanhamento.data_inicio}</p>
                </div>
                <div className={styles.container_status} style={
                    acompanhamento.is_ativo ? { borderColor : 'green' } : { borderColor : 'red' }
                } >
                    {acompanhamento.is_ativo ? (
                        <p style={status_on} >Acompanhamento ativo</p>
                    ) : (
                        <p style={status_off} >Acompanhamento encerrado</p>
                    )}
                </div>
            </header>

            <div className={styles.footer} >
                <button className={styles.encerrar} onClick={handleClick} >
                    Encerrar acompanhamento
                </button>
                <button className={styles.back} onClick={handleBack} >
                    Voltar
                </button>
            </div>

        </Page>
        </>
    )
}

const status_on = {
    color : 'green',
    fontWeight : 'bold',
    fontSize : 14
}

const status_off = {
    color : 'red',
    fontWeight : 'bold',
    fontSize : 14
}