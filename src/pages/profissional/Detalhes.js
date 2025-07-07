import styles from '../../styles/styles-profissional/details.module.css'
import { useLocation } from "react-router-dom"
import { InternalPage as Page } from "../../components/Container"
import { Title, Subtitle, Separator } from "../../components/Text"
import { UserDetails } from "../../components/Card"
import { model_usuario } from "../../assets/dados"
import { listaEmojis, listaNomesEmojis } from '../../assets/dados'

export default function FileRegistro () {
    
    const location = useLocation()
    const { registro, dados } = location.state 
    
    return (
        <Page dadosUsuario={dados}>

            <Title>Detalhes</Title>
            <Separator margin={30}/>

            <Subtitle>Acompanhado</Subtitle>
            <Separator margin={10}/>
            <UserDetails dados={model_usuario}/> {/* os dados partirão de uma consulta aos usuario com base no id do registro*/}
            <Separator margin={20}/>

            <Subtitle>Data do Registro</Subtitle>
            <Separator margin={10}/>
            <p className={styles.details_date}>{registro.title}</p>

            <span className={styles.emotion_title} >
                <h2>{model_usuario.nome}</h2>
                <Subtitle>descreveu estar se sentindo...</Subtitle>
            </span>
            <div className={styles.emotion_container}>

                <img 
                    src={listaEmojis[registro.valuehumor]} 
                    alt="imagem refente a emoção que o usuario estava sentindo" 
                    className={styles.emotion_icon}
                />
                <p className={styles.emotion_name} >{listaNomesEmojis[registro.valuehumor]}</p>
            </div>

        </Page>
    )
}