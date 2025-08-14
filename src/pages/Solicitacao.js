import { useEffect, useState } from "react";
import { InternalPage as Page } from "../components/Container";
import { useLocation } from "react-router-dom";
import { Line, Subtitle } from "../components/Text";
import styles from '../styles/solicitacao.module.css'
import { buscarAcompanhamento, buscarSolicitacao, solicitarAcompanhamento } from "../services/Usuarios";
import { ModalModular } from "../components/Modal";
import { dateString, isEmpty, setColorBoolean, setColorString } from "../services/Gadgets";
import { ProfessionalFollow } from "../components/Card";
import { Clickable, VoltarPagina } from "../components/Button";
import { TextInput } from "../components/Input";

export default function Solicitacao () {
    
    const usuario =  JSON.parse(sessionStorage.getItem('usuario'))
    const location = useLocation()
    const dados = location.state

    const [apiFollow, setFollow] = useState({})
    const [apiSolicitacao, setSolicitacao] = useState({})

    useEffect(() => {

        const fetchAcompanhamento = async () => {
            const response = await buscarAcompanhamento(usuario.token, dados.codigo_acompanhamento)
            setFollow(response)
        }
        const fetchSolicitacao = async () => {
            const response = await buscarSolicitacao(usuario.token, dados.codigo_acompanhamento)
            setSolicitacao(response)
        }
        fetchAcompanhamento()
        fetchSolicitacao()

    }, [])

    const [showModal, setShowModal] = useState(false)
    const [menssagem, setMenssagem] = useState('Gostaria que acompanhasse meus registros!')

    const preencherSolicitacao = (response) => {
        setSolicitacao(response)
    }       

    const enviarSolicitacao = async () => {
        const response = await solicitarAcompanhamento(
            usuario.token, 
            dados.codigo_acompanhamento, 
            menssagem
        )
        preencherSolicitacao(response.solicitacao)
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <ModalModular close={() => setShowModal(false)} title='Finalizar Solicitação' >

                    <p className={styles.paragrafo} >Você está enviando uma solicitação de acomapanhamento para {dados.nome} deixe aqui uma mensagem pra que ele entenda o motivo da solicitação</p>

                    <TextInput
                        name='menssagem'
                        placeholder='Deixe aqui o motivo da solicitação...'
                        value={menssagem}
                        onChange={(e) => setMenssagem(e.target.value)}
                    />

                    <footer className={styles.button_area} >
                        <Clickable color='green' action={enviarSolicitacao}>
                            Enviar Solicitação
                        </Clickable>
                    </footer>

                </ModalModular>
            )}
        
            <Page dados={usuario}>

                <div className={styles.page} >
                    <header style={{ display : 'flex', gap : 20}} >
                        <VoltarPagina/>
                        <Subtitle>Solicitar acompanhamento</Subtitle>
                    </header>
                    
                    <ProfessionalFollow dados={dados} />

                    <p className={styles.describe} >Ao solicitar um acomapnhamento uma notificação será enviada , quando aceita o profissional poderá ver seus registros, as infomações sobre o acompanhamento estarão na seção de profissionais, e você pode encerrar o acompanhamento quando bem entender</p>

                    <Line />

                    {(!isEmpty(apiFollow)) && (
                        <div className={styles.page_content} >
                            
                            <h3>Já existe um acompanhamento entre vocês</h3>
                            <p>iniciado em {dateString(apiFollow.data_inicio)}</p>

                            <div 
                                className={styles.estado} 
                                style={setColorBoolean(apiFollow.is_ativo)}
                            >
                                {apiFollow.is_ativo === true ? 'ativo' : 'não ativo'}
                            </div>

                        </div>
                    )}

                    {(!isEmpty(apiSolicitacao) && (isEmpty(apiFollow) || !apiFollow.is_ativo)) && (
                        <div className={styles.page_content}>
                            
                            <h3>Você já fez uma solicitação</h3>
                            <p>{apiSolicitacao.descricao}</p>
                            <p>{apiSolicitacao.menssagem}</p>
                            <p>feita no dia {dateString(apiSolicitacao.data)}</p>

                            <div className={styles.estado} style={setColorString(apiSolicitacao.estado)} >
                                <p>{apiSolicitacao.estado}</p>
                            </div>
                            
                        </div>
                    )}

                    <div className={styles.teste} >
                        { (!isEmpty(apiFollow) && apiFollow.is_ativo === false) && (
                            isEmpty(apiSolicitacao) && (
                                <Clickable color='green' action={() => setShowModal(true)} >
                                    Solicitar Reativação
                                </Clickable>
                            ))
                        }
                        {
                            (isEmpty(apiSolicitacao) && isEmpty(apiFollow)) && (
                                <Clickable color='green' action={() => setShowModal(true)} >
                                    Solicitar Acompanhamento
                                </Clickable>
                            )
                        }
                    </div>
                </div>
            </Page>
        </>
    )
}