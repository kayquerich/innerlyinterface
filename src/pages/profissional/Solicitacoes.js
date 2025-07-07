import { InternalPage as Page } from "../../components/Container";
import { useLocation } from "react-router-dom";

export default function Solicitacoes () {
    const location = useLocation()
    const dados = location.state

    return (
        <Page dadosUsuario={dados}>
            
        </Page>
    )
}