import { useLocation } from "react-router-dom"
import { InternalPage as Page } from "../components/Container"
import { Subtitle } from "../components/Text"

export default function Acompanhamento () {
    
    const location = useLocation()

    const usuario = JSON.parse(sessionStorage.getItem('usuario'))
    const codigo = location.state
    
    return (
        <Page dadosUsuario={usuario}>

            <Subtitle>Acompanhamento</Subtitle>

            <header>
                
            </header>

        </Page>
    )
}