import { useLocation, useNavigate } from "react-router-dom"
import { InternalPage as Page } from "../components/Container"
import styles from '../styles/global.module.css'
import { UserHeader as Header } from "../components/Header"
import { ProfissionalCard } from "../components/Card"
import istyles from '../styles/card.module.css'

export default function Perfil () {

    const location = useLocation()
    const navigation = useNavigate()

    return (
        <Page dadosUsuario={location.state}>
            <h1 className={styles.title} >Meu Perfil</h1>
            <Header nome={location.state.nome} contato={location.state.contato} email={location.state.email}/>
            <div style={{margin : 30}}></div>

            <h2 className={styles.subtitle}>Profissionais acompanhantes</h2>
            <div style={{margin : 10}}></div>

            <div className={istyles.containerprocard}>
                <ProfissionalCard nome='Nome Profissinal' autorizacao={true}/>
                <ProfissionalCard nome='Nome Profissinal' autorizacao={true}/>
                <ProfissionalCard nome='Nome Profissinal' autorizacao={true}/>
                <ProfissionalCard nome='Nome Profissinal' autorizacao={true}/>
            </div>

            <footer className={styles.rodape}>
                <span className={styles.internallink} onClick={() => navigation(-1)}>Meus registros</span>
                <span style={{color : '#a40089'}}>{'>'}Perfil</span>
            </footer> 
        </Page>
    )
}