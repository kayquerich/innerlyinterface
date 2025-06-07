import styles from '../styles/registros.module.css'
import { listaEmojis } from '../assets/dados'

export function Registro ({registro}){

    return (
        <div className={styles.registro}>
            <header className={styles.header}>
                <p>{registro.title}</p>
            </header>
            <div className={styles.description}>
                <p style={{textAlign : 'justify'}}>{registro.description}</p>
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