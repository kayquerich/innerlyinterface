import { useLocation } from "react-router-dom"
import { InternalPage as Page } from "../components/Container"
import styles from '../styles/global.module.css'
import { UserHeader as Header } from "../components/Header"
import { ProfissionalCard } from "../components/Card"
import istyles from '../styles/card.module.css'
import { EditarUsuario } from "../components/Modal"
import { CloseButton } from "../components/Button"
import { useState } from "react"

export default function Perfil () {

    const location = useLocation()

    const [isOpen, setIsOpen] = useState(false)

    const showEditPage = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            {isOpen ? (
                <>
                    <CloseButton handleClick={showEditPage}/>
                    <EditarUsuario data={location.state} close={showEditPage}/>
                </>
            ) : (<></>)}
            <Page dadosUsuario={location.state}>
                
                <h1 className={styles.title} >Meu Perfil</h1>
                <Header nome={location.state.nome} contato={location.state.contato} email={location.state.email} handleClick={showEditPage}/>
                <div style={{margin : 20}}></div>

                <h2 className={styles.subtitle}>Profissionais acompanhantes</h2>
                <div style={{margin : 10}}></div>

                <div className={istyles.containerprocard}>
                    <ProfissionalCard nome='Nome Profissional' autorizacao={true}/>
                    <ProfissionalCard nome='Nome Profissional' autorizacao={true}/>
                </div>

            </Page>
        </>
    )
}