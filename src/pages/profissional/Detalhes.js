import styles from '../../styles/styles-profissional/details.module.css'
import { useLocation } from "react-router-dom"
import { InternalPage as Page } from "../../components/Container"
import { Title, Subtitle, Separator, SubtitleDark } from "../../components/Text"
import { lista_cores_emotion, listaNomesEmojis } from "../../assets/dados"
import { listaEmojis } from '../../assets/dados'

export default function FileRegistro () {
    
    const location = useLocation()
    const { registro, dados } = location.state 
    
    return (
        <Page dadosUsuario={dados}>

            <Title>Detalhes</Title>
            <Separator margin={20}/>

            <Subtitle>Acompanhado</Subtitle>
            <Separator margin={10}/>
            
            <Separator margin={20}/>

            <SubtitleDark>Detalhes - {registro.title}</SubtitleDark>

            <Separator margin={20} />
            <SubtitleDark>A pessoa acompanhada descreveu estar se sentindo</SubtitleDark>
            <Separator margin={10}/>
            <div className={styles.emotion_space}> 
                <img 
                    src={listaEmojis[registro.valuehumor]} 
                    alt="emoji referente a emoção do usuario" 
                    className={styles.emotion_icon}
                />
                <p className={styles.emotion_name} style={{color : lista_cores_emotion[registro.valuehumor]}}>{listaNomesEmojis[registro.valuehumor]}</p>
            </div>
            <Separator margin={10}/>

            <SubtitleDark>Anotações</SubtitleDark>  
            <Separator margin={10}/>
            <div className={styles.container_anotation}>

            </div>

        </Page>
    )
}