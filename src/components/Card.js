import { useNavigate } from 'react-router-dom'
import perfilicon from '../assets/images/perfil-static-icon.png'
import styles from '../styles/card.module.css'

function ActiveTag ({boolean}) {
    return (
        <div className={boolean ? styles.tag_active : styles.tag_not_active}>
            {boolean ? 'ativa' : 'não-ativa'}
        </div>
    )
}

export function CardAcompanhamento ({dados}) {

    const navigation = useNavigate()

    const HandleClick = () => {
        navigation('/acompanhamento', { state : dados })
    }

    return (
        <div className={styles.card_follow} onClick={HandleClick} >

            <header className={styles.follow_header} >
                <img src={perfilicon} alt="imagem estatica de perfil" className={styles.follow_image} />

                <div>
                    <p className={styles.user_name} >{dados.nome_profissional}</p>
                    <p className={styles.follow_info} >Codigo de relação : {dados.codigo_acompanhamento}</p>
                </div>
            </header>

            <div className={styles.follow_body}>
                <p>Data de inicio : {dados.data_inicio}</p>
            </div>

            <ActiveTag boolean={dados.is_ativo} />

        </div>
    )
}

export function ProfessionalOption ({dados}) {

    const navigation = useNavigate()

    const HandleClick = () => {
        navigation('/solicitacao', { state : dados })
    }

    return (
        <div className={styles.profissional_tag} onClick={HandleClick} >
            <img src={perfilicon} alt="imagem estática de perfil" />
            <div style={{ height : '100%', paddingBlock : 10, marginLeft : 15 }} >
                <p className={styles.user_name} >{dados.nome}</p>
                <p className={styles.follow_info} >Codigo: {dados.codigo_acompanhamento}</p>
                <p>{dados.biografia.substring(0, 52) + '...'}</p>
            </div>
        </div>
    )
}