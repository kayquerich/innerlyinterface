import styles from '../styles/sidebar.module.css'
import perfilIcon from '../assets/images/perfil-static-icon.png'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function SideBar ({dadosUsuario}) {

    const navigation = useNavigate()

    const onHandleClick = () => {
        navigation('/perfil', {state : dadosUsuario})
    }

    return (
        <div className={styles.container}>

            <div className={styles.header} onClick={onHandleClick} > 
                <img src={perfilIcon} alt="imagem estática de icone de perfil" className={styles.perfilicon}/>
                <div className={styles.username}>{dadosUsuario.nome}</div>
            </div>

            <OptionLink label='Registros' path={'/registros'} dadosUsuario={{}} icon='rectangle-list'/>
            <OptionLink label='Histórico' path={'/'} dadosUsuario={{}} icon='chart-simple'/>

        </div>
    )
}

function OptionLink ({icon, label, path, dadosUsuario}) {

    const navigation = useNavigate()

    const onHandleClick = () => {
        navigation(path, dadosUsuario)
    }

    return (
        <div onClick={onHandleClick} className={styles.option}>
            <FontAwesomeIcon icon={['fas', icon]} />
            <span>{label}</span>
        </div>
    )
}