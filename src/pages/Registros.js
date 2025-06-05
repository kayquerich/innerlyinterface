import { useState } from "react"
import { InternalPage as Container } from "../components/Container"
import styles from '../styles/global.module.css'

export default function UserRegistros ({dadosUsuario}) {

    const [fakeData] = useState({
        nome : 'Kayque Richarlyson' 
    })

    return (
        <Container dadosUsuario={fakeData}>
            <div>
                <h1 className={styles.title}>Meus Registros</h1>
            </div>
        </Container>
    )
}