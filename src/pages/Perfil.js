import { InternalPage as Container } from "../components/Container"
import { fakeData } from "../assets/dados"
import { Subtitle } from "../components/Text"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome"
import { ProfissionalCard as Card } from "../components/Card"
import profileImage from '../assets/images/perfil-static-icon.png'
import styles from '../styles/perfil.module.css'

export default function Perfil () {
    return (
        <Container dadosUsuario={fakeData}>

            <Subtitle text='Meu Perfil' />

            <div className={styles.header} style={{marginBlock : 10}}>
                <div>
                    <img src={profileImage} alt="imagem estática de perfil"/>
                </div>
                <div className={styles.headerinfos}>
                    <p className={styles.name} >{fakeData.nome}</p>
                    <p>{fakeData.username}</p>
                    <p>{fakeData.nascimento}</p>
                </div>
            </div>

            <div className={styles.informacoes} style={{marginBlock : 20}}>

                <h3 className={styles.title} >Informações Pessoais</h3>
                <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
                
                <div className={styles.internal} >

                    <div className={styles.column}>
                        <Informacao label='Nome' value={fakeData.nome} />
                        <Informacao label='Username' value={fakeData.username} />
                    </div>
                    <div className={styles.column}>
                        <Informacao label='Email' value={fakeData.email}/>
                        <Informacao label='Contato' value={fakeData.contato}/>
                    </div>
                    <div className={styles.column}>
                        <Informacao label='Data de Nascimento' value={fakeData.nascimento}/>
                    </div>

                </div>

                <button className={styles.editbutton}>
                    <span>Editar</span>
                    <Icon icon='pen'/>
                </button>

            </div>

            <div className={styles.containerpro}>

                <h3 className={styles.title}>Profissionais Relacionados</h3>
                <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />

                <div className={styles.profissionais}>
                    <Card autorizacao={true} nome='Psicologo'/>
                    <Card autorizacao={true} nome='Psicologo'/>
                    <Card autorizacao={false} nome='Psicologo'/>
                </div>
            </div>

        </Container>
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