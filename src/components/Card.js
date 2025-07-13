import perfilicon from '../assets/images/perfil-static-icon.png'
import styles from '../styles/card.module.css'
import { Separator } from './Text'

function ActiveTag ({boolean}) {
    return (
        <div className={boolean ? styles.tag_active : styles.tag_not_active}>
            {boolean ? 'ativa' : 'não-ativa'}
        </div>
    )
}

export function CardAcompanhamento ({dados}) {
    return (
        <div className={styles.card_follow} >
            <header className={styles.follow_header} >
                <img src={perfilicon} alt="imagem estatica de perfil" className={styles.follow_image} />

                <div>
                    <p className={styles.user_name} >{dados.nome_profissional}</p>
                    <p className={styles.follow_info} >Codigo de relação : {dados.codigo_acompanhamento}</p>
                </div>
            </header>

            <div className={styles.follow_body}>
                <p style={{ textAlign : 'justify' }}>Biografia : {dados.biografia}</p>
                <Separator margin={10} />
                <p>Inicio do acompanhamento : {dados.data_inicio}</p>
            </div>

            <ActiveTag boolean={dados.is_ativo} />
        </div>
    )
}