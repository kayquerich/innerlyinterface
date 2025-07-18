import { InternalPage as Container } from "../components/Container"
import { Subtitle } from "../components/Text"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome"
import { UserEditPage as Modal } from "../components/Modal"
import profileImage from '../assets/images/perfil-static-icon.png'
import styles from '../styles/perfil.module.css'
import { useState } from "react"

export default function Perfil () {

    const [isOpen, setOpen] = useState(false)

    const dados = JSON.parse(sessionStorage.getItem('usuario'))

    return (
        <>
            {isOpen ? (<Modal dadosUsuario={dados} close={() => setOpen(false)}/>) : <></>}
            <Container dadosUsuario={dados}>

                <Subtitle>Meu perfil</Subtitle>

                <div className={styles.header} style={{marginBlock : 10}}>
                    <div>
                        <img src={profileImage} alt="imagem estática de perfil"/>
                    </div>
                    <div className={styles.headerinfos}>
                        <p className={styles.name} >{dados.nome}</p>
                        <p style={{color : 'gray'}}>{dados.username}</p>
                        <p style={{color : '#374151'}} >{dados.biografia}</p>
                    </div>
                </div>

                <div className={styles.informacoes} style={{marginBlock : 20}}>

                    <h3 className={styles.title} >Informações Pessoais</h3>
                    <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
                    
                    <div className={styles.internal} >

                        <div className={styles.column}>
                            <Informacao label='Nome' value={dados.nome} />
                            <Informacao label='Username' value={dados.username} />
                        </div>
                        <div className={styles.column}>
                            <Informacao label='Email' value={dados.email}/>
                            <Informacao label='Contato' value={dados.contato}/>
                        </div>
                        <div className={styles.column}>
                            <Informacao label='Data de Nascimento' value={dados.nascimento}/>
                            <Informacao label='Gênero' value={dados.genero}/>
                        </div>

                    </div>

                    <button className={styles.editbutton} onClick={() => setOpen(true)}>
                        <span>Editar</span>
                        <Icon icon='pen'/>
                    </button>

                </div>

            </Container>
        </>
    )
}

function Informacao ({label, value}) {
    return (
        <div className={styles.data}>
            <p className={styles.label}>{label}</p>
            <p>{value}</p>
        </div>
    )
}