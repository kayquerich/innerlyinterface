import { useLocation } from "react-router-dom"
import { InternalPage as Page } from "../components/Container"

export default function Historico () {

    const location = useLocation()
    const dados = location.state

    return (
        <Page dadosUsuario={dados}>
            <h1>Histórico</h1>
        </Page>
    )
}