import { useState } from "react"
import { InternalPage as Page } from "../../components/Container"
import { useLocation, useNavigate } from "react-router-dom"
import { Separator, Subtitle } from "../../components/Text"
import { UsuarioCard } from "../../components/Card"
import { dateString } from "../../services/Gadgets"
import styles from '../../styles/styles-profissional/response.module.css'
import { Clickable } from "../../components/Button"
import { listarAcompanhamentos, responderSolicitacao } from "../../services/Profissionais"
import { RecusarSolicitacao } from "../../components/Modal"

export default function Responder () {

    const [profissional, setProfissional] = useState(JSON.parse(sessionStorage.getItem('profissional')))
    const location = useLocation()
    const solicitacao = location.state
    const navigation = useNavigate()

    const sendResponse = async (response) => {
        const result = await responderSolicitacao(profissional.token, solicitacao.id, response)
        if (result) {
            const novos_acompanhamentos = await listarAcompanhamentos(profissional.token)
            sessionStorage.setItem('acompanhamentos', JSON.stringify(novos_acompanhamentos))

            let notify_list = JSON.parse(sessionStorage.getItem('solicitacoes'))
            notify_list = notify_list.filter(item => item.id !== solicitacao.id)
            sessionStorage.setItem('solicitacoes', JSON.stringify(notify_list))

            navigation('/profissional/home')
        }
    }

    const [showModal, setShow] = useState(false)

    return (
        <>
        {showModal && <RecusarSolicitacao close={() => setShow(false)} token={profissional.token} id={solicitacao.id} />}
        <Page dados={profissional} style={{ positon : 'relative' }}> 
            
            <Subtitle>Responder solicitação</Subtitle>
            
            <div style={{ width : '50%', marginBlock : 10 }} >
                <p>Você recebeu uma solicitação de acompanhamento, ao aceitar poderá vizualizar os registros que o usuario solicitante postar na plataforma!</p>
            </div>
            
            <UsuarioCard dados={solicitacao.dados_usuario} />
            
            <p>{solicitacao.descricao}</p>

            <Separator margin={10} />
            <p>Data da solicitação</p>
            <p>{dateString(solicitacao.data)}</p>
            <Separator margin={10} />

            <div className={styles.container_message}>
                <div className={styles.triangulo} ></div>
                <div className={styles.message} >{solicitacao.menssagem}</div>
            </div>

            <footer className={styles.container_buttons} >

                <Clickable color='green' action={() => sendResponse('aceita')}>
                    Aceitar
                </Clickable>
                <Clickable color='#383897' action={() => navigation('/profissional/home')}>
                    Voltar
                </Clickable>
                <Clickable color='#a90000' action={() => setShow(true)} >
                    Recusar
                </Clickable>

            </footer>

        </Page>
        </>
    )
}