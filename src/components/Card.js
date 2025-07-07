import perfilicon from '../assets/images/perfil-static-icon.png'
import styles from '../styles/card.module.css'
import { Separator } from './Text'

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

export function UserCard ({dados}) {
    return (
        <div className={styles.user_card}>
            <img src={perfilicon} alt="imagem estática de perfil" className={styles.user_photo}/>
            <div>
                <p className={styles.user_name} >{dados.nome}</p>
                <Separator margin={5}/>
                <p style={{color : 'gray'}} >Inicio do Acompanhamento</p>
                <p style={{color : 'gray'}} >{dados.data_autorizacao}</p>
            </div>
            <ActiveTag boolean={dados.isactive} />
        </div>
    )
}

function ActiveTag ({boolean}) {
    return (
        <div className={boolean ? styles.tag_active : styles.tag_not_active}>
            {boolean ? 'ativa' : 'não-ativa'}
        </div>
    )
}

export function UserDetails ({dados}) {
    return (
        <div className={styles.user_details}>

            <img src={perfilicon} alt="imagem estática de perfil" className={styles.details_image}/>

            <div className={styles.user_details_infos}>

                <p className={styles.user_name} >{dados.nome}</p>
                <Separator margin={10}/>
                
                <p>Contato: {dados.contato}</p>
                <p>Inicio do acompanhamento : 07/07/2025</p>
            </div>

        </div>
    )
}