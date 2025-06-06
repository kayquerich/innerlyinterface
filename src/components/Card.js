import perfilicon from '../assets/images/perfil-static-icon.png'
import styles from '../styles/card.module.css'

export function ProfissionalCard ({nome, autorizacao}) {
    return (
        <div className={styles.profissionalcard}>
            <img src={perfilicon} alt="icone estático de foto de perfil" className={styles.perfilcardicon}/>
            <div style={{display : 'flex', flexDirection : 'column'}}>
                <span>{nome}</span>
                <span className={autorizacao ? styles.auth : styles.notauth}>{autorizacao ? 'Autorizado' : 'Não Autorizado'}</span>
            </div>
        </div>
    )
}