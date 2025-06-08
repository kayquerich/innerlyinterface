import { InternalPage as Container } from "../components/Container"
import styles from '../styles/global.module.css'
import iStyles from '../styles/registros.module.css'
import { Registro } from "../components/Registro"
import { fakeRegistros } from '../assets/registrosfake'
import { GoToAddRegistro as Add } from "../components/Button"
import { fakeData } from "../assets/dados"

export default function UserRegistros ({dadosUsuario}) {


    return (
        <Container dadosUsuario={fakeData}>
                <h1 className={styles.title}>Meus Registros</h1>

                <div className={iStyles.containerregistros}>
                    <Registro registro={fakeRegistros[0]} dadosUsuario={fakeData} />
                    <Registro registro={fakeRegistros[1]} dadosUsuario={fakeData} />
                    <Registro registro={fakeRegistros[2]} dadosUsuario={fakeData} />
                    <Registro registro={fakeRegistros[3]} dadosUsuario={fakeData} />
                    <Registro registro={fakeRegistros[4]} dadosUsuario={fakeData} />
                    <Registro registro={fakeRegistros[5]} dadosUsuario={fakeData} />
                </div>

                <Add dadosUsuario={fakeData}/>
        </Container>
    )
}