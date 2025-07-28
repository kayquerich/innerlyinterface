import { useLocation } from "react-router-dom"
import { InternalPage as Page } from "../../components/Container"
import { useEffect, useState } from "react"
import { getProfissional } from "../../services/Profissionais"

export default function Home () {

    const location = useLocation()
    const data_login = location.state
    const [profissional, setProfissional] = useState({})
    const [registros, setRegistros] = useState([])

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

        }
        fetchDados()
    }, [data_login])

    return (
        <Page dadosUsuario={profissional}>
            
        </Page>
    )
}