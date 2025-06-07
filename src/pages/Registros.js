import { useState } from "react"
import { InternalPage as Container } from "../components/Container"
import styles from '../styles/global.module.css'
import iStyles from '../styles/registros.module.css'
import { Registro } from "../components/Registro"
import { fakeRegistros } from '../assets/registrosfake'

export default function UserRegistros ({dadosUsuario}) {

    const [fakeData] = useState({
        nome : 'Kayque Richarlyson',
        email : 'kayque@email.com',
        senha : 'senha123',
        contato : '(87) 9 9101-0743' 
    })

    return (
        <Container dadosUsuario={fakeData}>
                <h1 className={styles.title}>Meus Registros</h1>
                <div className={iStyles.containerregistros}>
                    <Registro registro={fakeRegistros[0]}/>
                    <Registro registro={fakeRegistros[1]}/>
                    <Registro registro={fakeRegistros[2]}/>
                    <Registro registro={fakeRegistros[3]}/>
                    <Registro registro={fakeRegistros[4]}/>
                    <Registro registro={fakeRegistros[5]}/>
                </div>
        </Container>
    )
}