import { useLocation } from "react-router-dom"
import { InternalPage as Page } from "../../components/Container"
import { useEffect, useState } from "react"
import { getProfissional, listarAcompanhamentos, listarRegistrosByFollow, listarSolicitacoes } from "../../services/Profissionais"
import { Subtitle } from "../../components/Text"
import styles from '../../styles/styles-profissional/home.module.css'
import { Notification } from "../../components/Card"
import { Registro } from "../../components/Registro"
import { filtarRegistros } from "../../services/Gadgets"

export default function Home () {

    const location = useLocation()
    const data_login = location.state
    const [profissional, setProfissional] = useState({})
    const [solicitacoes, setSolicitacoes] = useState([])
    const [registrosSemana, setRegistrosSemana] = useState([])

    useEffect(() => {
        const fetchDados = async () => {

            let temporary_data = null
            const saved_profissional = sessionStorage.getItem('profissional')

            if (saved_profissional) {
                temporary_data = JSON.parse(saved_profissional)
                setProfissional(temporary_data)
            } else if (data_login && data_login.token) {

                const result = await getProfissional(data_login.token);
                temporary_data = { ...result, token: data_login.token };
                setProfissional(temporary_data);
                sessionStorage.setItem('profissional', JSON.stringify(temporary_data));

            }

            const follow_list = sessionStorage.getItem('acompanhamentos')

            if (!follow_list) {
                const result = await listarAcompanhamentos(data_login.token)
                sessionStorage.setItem('acompanhamentos', JSON.stringify(result))
            }

            let temp_solict_list = null
            const saved_solicitacoes = sessionStorage.getItem('solicitacoes')

            if (saved_solicitacoes) {
                temp_solict_list = JSON.parse(saved_solicitacoes)
                setSolicitacoes(temp_solict_list)
            } else {
                const result = await listarSolicitacoes(data_login.token)
                setSolicitacoes(result)
                sessionStorage.setItem('solicitacoes', JSON.stringify(result))
            }

            let temp_register_list = null
            const saved_registros = sessionStorage.getItem('registros')

            if (saved_registros) {

                temp_register_list = JSON.parse(saved_registros)
                setRegistrosSemana(filtarRegistros(temp_register_list))

            } else {
                const result = await listarRegistrosByFollow(data_login.token)
                sessionStorage.setItem('registros', JSON.stringify(result))
                setRegistrosSemana(filtarRegistros(result))
            }

        }
        fetchDados()
    }, [data_login])

    return (
        <Page dados={profissional} style={{ display : 'flex' }}>
            <div className={styles.container} >
                <Subtitle>Registros recentes</Subtitle>

                {registrosSemana.length === 0 && (
                    <div>
                        <p>Não há registros recentes</p>
                    </div>
                )}

                <div className={styles.container_registros} >
                    {registrosSemana.map((item, index) => (
                        <Registro dados={profissional} key={index} registro={item} />
                    ))}
                </div>
            
            </div>

            <div className={styles.notifications} >
                <h3>Solicitações de acompanhamento</h3>
                {solicitacoes && solicitacoes.map((item, key) => (
                    <Notification dados={item} key={key} />
                ))}
            </div>

        </Page>
    )
}