import styles from '../styles/header.module.css'
import picture from '../assets/images/perfil-static-icon.png'

export function ProfissionalHeader ({dados}) { 
    return (
        <div className={styles.container} >
            <img src={picture} alt="imagem estática de perfil" />
            <div className={styles.header_text} >

                <p className={styles.name} >{dados.nome}</p>
                <p className={styles.opacity} >{dados.username}</p>
                <p className={styles.opacity} >Codigo de acompanhamento: {dados.codigo_acompanhamento}</p>
                <p>{dados.biografia}</p>

            </div>
        </div>
    )
}

export function UserHeader ({dados}) {
    return (
        <div className={styles.container} >
            <img src={picture} alt="imagem estática de perfil" />
            <div className={styles.header_text} >
                <p className={styles.name} >{dados.nome}</p>
                <p className={styles.opacity} >{dados.username}</p>
                <p>{dados.biografia}</p>
            </div>
        </div>
    )
}