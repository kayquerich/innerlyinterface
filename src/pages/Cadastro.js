import styles from '../styles/global.module.css'
import onda from '../assets/onda-cut.png'

export default function Cadastro () {
    return (
        <div className={styles.pages}>
            <img src={onda} alt="imagem de uma onda" className={styles.wave}/>
        </div>
    )
}