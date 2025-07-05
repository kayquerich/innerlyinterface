import styles from '../styles/registros.module.css'
import { listaEmojis } from '../assets/dados'
import { useNavigate } from 'react-router-dom'

export function Registro ({registro, dadosUsuario}){

    const navigation = useNavigate()

    return (
        <div className={styles.registro} onClick={() => navigation('/registros/detalhes', {state : {registro : registro, dadosUsuario : dadosUsuario}})}>

            <header className={styles.header}>
                <p>{registro.title}</p>
            </header>
            <div className={styles.description}>
                <p style={{textAlign : 'justify'}}>{registro.description.substring(0,190) + '...'}</p>
            </div>
            <footer className={styles.footer}>
                <img 
                    src={listaEmojis[registro.valuehumor]} 
                    alt={'emoji' + listaEmojis[registro.valuehumor]} 
                    className={styles.emoji}
                />
            </footer>

        </div>
    )
}