import styles from '../styles/sidebar.module.css'
import logo from '../assets/images/logo-site.png'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../services/Autenticacao'

export function SideBar ({dados}) {

    const navigation = useNavigate()

    const logoutAction = async () => {
        if (dados.token) {
            const foi = await logout(dados.token)
            if (foi) {
                navigation('/')
            }
        }
    }

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <img src={logo} alt="logo do site" className={styles.logo}/>
                <div className={styles.headertext}>
                    <h3>Innerly</h3>
                    <span>Como está se sentindo hoje?</span>
                </div>
            </div>

            <hr style={{ border: '1px solid #fff', margin: '10px 0' }} />

            <p style={{color : 'white', fontSize : 16, marginBottom : 10}}>Menu</p>

            <div className={styles.containeroptions}>

                {dados && 'concelho' in dados ? (
                    <>
                        <OptionLink label='Registros' path='/profissional/home' dados={dados} icon='file' />
                        <OptionLink label='Meu Perfil' path='/profissional/perfil' dados={dados} icon='user-doctor' />
                        <OptionLink label='Solicitações' path='/profissional/solicitacoes' dados={dados} icon='user-group'/>    
                    </>
                ) : (
                    <>
                        <OptionLink label='Registros' path='/registros' dados={dados} icon='file' />
                        <OptionLink label='Meu Perfil' path='/perfil' dados={dados} icon='user' />
                        <OptionLink label='Histórico' path='/historico' dados={dados} icon='square-poll-vertical'/> 
                        <OptionLink label='Profissionais' path='/profissionais' icon='user-doctor' />   
                    </>
                )}
            
            </div>

            <button className={styles.logoutbutton} onClick={logoutAction}>
                <FontAwesomeIcon icon='right-to-bracket' transform='rotate-180'/>
                <span style={{fontSize : 14}}>Sair</span>
            </button>

        </div>
    )
}

function OptionLink ({icon, label, path, dados}) {

    const navigation = useNavigate()

    const onHandleClick = () => {
        navigation(path, { state : dados })
    }

    return (
        <div onClick={onHandleClick} className={styles.option}>
            <FontAwesomeIcon icon={['fas', icon]} />
            <span className={styles.labelopt}>{label}</span>
        </div>
    )
}