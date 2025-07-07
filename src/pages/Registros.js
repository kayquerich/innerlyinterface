import { InternalPage as Page } from "../components/Container"
import styles from '../styles/registros.module.css'
import { Registro } from "../components/Registro"
import { fakeRegistros } from '../assets/registrosfake'
import { GoToAddRegistro as Add } from "../components/Button"
import { Title } from "../components/Text"
import { useLocation } from "react-router-dom"

export default function UserRegistros () {

    const location = useLocation()
    const usuario = location.state

    return (
        <Page dadosUsuario={usuario}>

            <Title>Meus Registros</Title>

            <div className={styles.containerregistros}>
                <Registro registro={fakeRegistros[0]} dados={usuario} />
                <Registro registro={fakeRegistros[1]} dados={usuario} />
                <Registro registro={fakeRegistros[2]} dados={usuario} />
                <Registro registro={fakeRegistros[3]} dados={usuario} />
                <Registro registro={fakeRegistros[4]} dados={usuario} />
                <Registro registro={fakeRegistros[5]} dados={usuario} />
            </div>

            <Add dados={usuario}/>

        </Page>
    )
}