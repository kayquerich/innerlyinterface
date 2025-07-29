import { useLocation } from "react-router-dom"
import { InternalPage as Page } from "../../components/Container"
import { useEffect, useState } from "react"
import { getProfissional, listarAcompanhamentos, listarSolicitacoes } from "../../services/Profissionais"
import { Subtitle } from "../../components/Text"
import styles from '../../styles/styles-profissional/home.module.css'
import { SearchBar } from "../../components/Search"
import { Notification } from "../../components/Card"

export default function Home () {

    const location = useLocation()
    const data_login = location.state
    const [profissional, setProfissional] = useState({})
    const [registros, setRegistros] = useState([])
    const [follows, setFollows] = useState([])
    const [solicitacoes, setSolicitacoes] = useState([])

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

            let temp_follow_list = null
            const follow_list = sessionStorage.getItem('acompanhamentos')

            if (follow_list) {
                temp_follow_list = JSON.parse(follow_list)
                setFollows(temp_follow_list)
            } else {
                const result = await listarAcompanhamentos(data_login.token)
                setFollows(result)
                sessionStorage.setItem('acompanhamentos', JSON.stringify(result))
            }

            let temp_solict_list = null
            const saved_solicitacoes = sessionStorage.getItem('solicitacoes')

            if (follow_list) {
                temp_solict_list = JSON.parse(saved_solicitacoes)
                setSolicitacoes(temp_solict_list)
            } else {
                const result = await listarSolicitacoes(data_login.token)
                setSolicitacoes(result)
                sessionStorage.setItem('solicitacoes', JSON.stringify(result))
            }

        }
        fetchDados()
    }, [data_login])

    return (
        <Page dados={profissional} style={{ display : 'flex' }}>
            {console.log(solicitacoes)}
            {console.log(follows)}
            <div className={styles.container} >
                <Subtitle>Registros recentes</Subtitle>
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