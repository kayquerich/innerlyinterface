import styles from '../styles/header.module.css'
import { profile_pics } from '../assets/dados'
import { useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export function ProfissionalHeader ({dados}) { 
    return (
        <div className={styles.container} >
            <img 
                src={profile_pics[dados.profile_pic_value]} 
                alt="imagem estática de perfil" 
                className={styles.profile_image}
            />
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

    const [inFocus, setFocus] = useState(false)

    return (
        <div className={styles.container} >
            <div className={styles.profile_image}
                onMouseEnter={() => setFocus(true)}
                onMouseLeave={() => setFocus(false)}
            >
                <img 
                    src={profile_pics[dados.profile_pic_value]} 
                    alt="imagem estática de perfil" 
                    className={styles.profile_image}
                />
                <div 
                    style={ inFocus ? { display : 'flex' } : { display : 'none' }} 
                    className={styles.profile_image_hover}
                >
                    <Icon icon='pen'/>
                </div>
            </div>
            <div className={styles.header_text} >
                <p className={styles.name} >{dados.nome}</p>
                <p className={styles.opacity} >{dados.username}</p>
                <p>{dados.biografia}</p>
            </div>
        </div>
    )
}