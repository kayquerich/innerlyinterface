import { useEffect, useState } from "react";
import { InternalPage as Page } from "../components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { Line, Subtitle } from "../components/Text";
import styles from '../styles/solicitacao.module.css'
import profilePic from '../assets/images/perfil-static-icon.png'
import { buscarAcompanhamento, buscarSolicitacao } from "../services/Usuarios";
import { FinalizarSolicitacao } from "../components/Modal";
import { dateString, isEmpty, setColorBoolean, setColorString } from "../services/Gadgets";

export default function Solicitacao () {
    
    const usuario =  JSON.parse(sessionStorage.getItem('usuario'))
    const location = useLocation()
    const dados = location.state

    const navigation = useNavigate()

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
    const intercaoModal = async () => {
        setShowModal(!showModal)
    }

    const preencherSolicitacao = (res) => {
        setSolicitacao(res)
    }       

    return (
        <>
        {showModal && (<FinalizarSolicitacao 
            close={intercaoModal} 
            dados={dados} 
            token={usuario.token}
            execute={preencherSolicitacao}
        />)}
        <Page dados={usuario} >

            <Subtitle>Solicitar acompanhamento</Subtitle>
            <header className={styles.header} >
                <img src={profilePic} alt="imagem estática de perfil" />
                <div className={styles.header_text} >
                    <h1>{dados.nome}</h1>
                    <p className={styles.codigo}>Codigo relação: {dados.codigo_acompanhamento}</p>
                    <p>{dados.biografia}</p>
                </div>
            </header>

            <p>Ao solicitar acomapnhamento de um profissional uma notificação será enviada para o mesmo, quando ele aceitar o profissional poderá ver seus registros, todas as infomações sobre o acompanhamento estarão na seção de profissionais, e você pode encerrar o acompanhamento quando bem entender</p>

            <Line />

            {(!isEmpty(apiFollow)) && (
                <div>
                    <h3>Já existe um acompanhamento entre vocês</h3>
                    <p>iniciado em {dateString(apiFollow.data_inicio)}</p>

                    <div className={styles.estado} style={setColorBoolean(apiFollow.is_ativo)}>
                        <p style={setColorBoolean(apiFollow.is_ativo)}> 
                            {apiFollow.is_ativo === true ? 'ativo' : 'não ativo'}
                        </p>
                    </div>

                </div>
            )}

            {(!isEmpty(apiSolicitacao) && isEmpty(apiFollow)) && (
                <div style={{ display : 'flex', flexDirection : 'column', gap : 5 }} >
                    
                    <h3>Você já fez uma solicitação</h3>
                    <p>{apiSolicitacao.descricao}</p>
                    <p>{apiSolicitacao.menssagem}</p>
                    <p>feita no dia {dateString(apiSolicitacao.data)}</p>

                    <div className={styles.estado} style={setColorString(apiSolicitacao.estado)} >
                        <p>{apiSolicitacao.estado}</p>
                    </div>
                    
                </div>
            )}

            <footer className={styles.footer} >
                {console.log(apiFollow)}
                { (!isEmpty(apiFollow) && apiFollow.is_ativo === false) &&
                    <button className={styles.solicitar} onClick={intercaoModal} >
                        Solicitar reativação
                    </button>
                }
                {
                    (isEmpty(apiSolicitacao) && isEmpty(apiFollow)) && 
                    <button className={styles.solicitar} onClick={intercaoModal} >
                        Solicitar Acompanhamento
                    </button>

                }
                <button className={styles.back} onClick={() => navigation('/profissionais')} >Voltar</button>
            </footer>

        </Page>
        </>
    )
}