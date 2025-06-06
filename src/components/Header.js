import styles from '../styles/perfil.module.css'
import { EditButton } from './Button'

export function UserHeader ({nome, contato, email}) {

    const onHandleClick = () => {
        alert('go to edit pages')
    }

    return (
        <header className={styles.header}>
            <div className={styles.nome}>
                <div>{nome}</div>
                <EditButton handleClick={onHandleClick}/>
            </div>
            <div style={{margin : 10}}></div>
            <div className={styles.informacoes}>
                <div className={styles.informacao}>
                    <span>Contato: </span>
                    <span style={{marginLeft : 10}}>{contato}</span>
                </div>
                <div className={styles.informacao} >
                    <span>Email: </span>
                    <span style={{marginLeft : 10}}>{email}</span>
                </div>
            </div>
        </header>
    )
}