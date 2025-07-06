import styles from '../styles/imagens.module.css'
import onda from '../assets/onda-cut.png'

export function ImageLogin () {
    return (
        <div className={styles.imagelogin}>
                    
        </div>
    )
}

export function ImageWave () {
    return (
        <img src={onda} alt="imagem de uma onda" className={styles.wave}/>
    )    
}