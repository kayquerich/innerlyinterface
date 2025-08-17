import { useState } from "react"
import { InternalPage as Page } from "../../components/Container"
import { useLocation, useNavigate } from "react-router-dom"
import { Separator, Subtitle } from "../../components/Text"
import { UsuarioCard } from "../../components/Card"
import { dateString } from "../../services/Gadgets"
import styles from '../../styles/styles-profissional/response.module.css'
import { Clickable, VoltarPagina } from "../../components/Button"
import { listarAcompanhamentos, listarClientes, listarRegistrosByFollow, responderSolicitacao } from "../../services/Profissionais"
import { ModalModular } from "../../components/Modal"

export default function Responder () {

    const profissional = JSON.parse(sessionStorage.getItem('profissional'))
    const location = useLocation()
    const solicitacao = location.state
    const navigation = useNavigate()

    const sendResponse = async (response) => {

        const result = await responderSolicitacao(profissional.token, solicitacao.id, response)

        if (result) {

            const novos_acompanhamentos = await listarAcompanhamentos(profissional.token)
            sessionStorage.setItem('acompanhamentos', JSON.stringify(novos_acompanhamentos))

            const novos_registros = await listarRegistrosByFollow(profissional.token)
            sessionStorage.setItem('registros', JSON.stringify(novos_registros))

            let notify_list = JSON.parse(sessionStorage.getItem('solicitacoes'))
            notify_list = notify_list.filter(item => item.id !== solicitacao.id)
            sessionStorage.setItem('solicitacoes', JSON.stringify(notify_list))
            
            const new_clients = await listarClientes(profissional.token)
            sessionStorage.setItem('clientes', JSON.stringify(new_clients))

            navigation('/profissional/home')

        }
    }

    const [showModal, setShow] = useState(false)

    const solicitacoes = JSON.parse(sessionStorage.getItem('solicitacoes'))
    const sendRefuse = async () => {

        await responderSolicitacao(profissional.token, solicitacao.id, 'recusada')
    
        const dados = solicitacoes.filter(item => item.id !== solicitacao.id)
        sessionStorage.setItem('solicitacoes', JSON.stringify(dados))

        alert('Solicitação recusada')
        navigation('/profissional/home')

    }

    return (
        <>

            {showModal && (
                <ModalModular 
                    title='Recusar solicitação' 
                    close={() => setShow(false)} 
                >
                    <p>Deseja realmente recusar a solicitação?</p>
                    <footer className={styles.button_area} >
                        <Clickable color='var(--button-red)' action={sendRefuse} >
                            Recusar
                        </Clickable>
                    </footer>
                </ModalModular>
            )}

            <Page dados={profissional} style={{ positon : 'relative' }}> 

                <header style={{ display : 'flex', gap : 20 }}>
                    <VoltarPagina/>
                    <Subtitle>Responder solicitação</Subtitle>
                </header>
                
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
                    <Clickable color='var(--button-red)' action={() => setShow(true)} >
                        Recusar
                    </Clickable>

                </footer>

            </Page>
        </>
    )
}