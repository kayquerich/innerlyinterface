import { InternalPage as Page } from "../components/Container"
import styles from '../styles/registros.module.css'
import { Registro } from "../components/Registro"
import { fakeRegistros } from '../assets/registrosfake'
import { GoToAddRegistro as Add } from "../components/Button"
import { fakeData } from '../assets/dados'
import { Title } from "../components/Text"

export default function UserRegistros ({dadosUsuario}) {


    return (
        <Page dadosUsuario={fakeData}>

            <Title>Meus Registros</Title>

            <div className={styles.containerregistros}>
                <Registro registro={fakeRegistros[0]} dadosUsuario={fakeData} />
                <Registro registro={fakeRegistros[1]} dadosUsuario={fakeData} />
                <Registro registro={fakeRegistros[2]} dadosUsuario={fakeData} />
                <Registro registro={fakeRegistros[3]} dadosUsuario={fakeData} />
                <Registro registro={fakeRegistros[4]} dadosUsuario={fakeData} />
                <Registro registro={fakeRegistros[5]} dadosUsuario={fakeData} />
            </div>

            <Add dadosUsuario={fakeData}/>

        </Page>
    )
}