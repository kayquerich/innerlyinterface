import styles from '../../styles/styles-profissional/details.module.css'
import { useLocation } from "react-router-dom"
import { InternalPage as Page } from "../../components/Container"
import { Subtitle, Separator, Line, TitleThree} from "../../components/Text"
import { VoltarPagina } from '../../components/Button'
import { UsuarioCard } from '../../components/Card'
import { setEmotionStr } from '../../services/Gadgets'

export default function FileRegistro () {
    
    const location = useLocation()
    const { registro, dados } = location.state 
    const profissional = JSON.parse(sessionStorage.getItem('profissional'))
    
    return (
        <Page dados={profissional}>

            <div className={styles.header} >
                <VoltarPagina/>
                <Subtitle>Detalhes do Registro</Subtitle>
            </div>
            <Separator margin={20} />

            <TitleThree>Usuario</TitleThree>
            <UsuarioCard dados={registro.dados_usuario} />
            <Line/>

            <Separator margin={20} />

            <TitleThree>{registro.title}</TitleThree>
            
            <div 
                title='A plataforma ofereçe no momento do cadastro de registro um campo onde o usuario pode dizer com está se sentindo no momento através da seleção de um "nivel de humor" sendo 1 o menor - "Muito mal" e 5 o maior - "Muito bem"' 
                style={{ marginBlock : 10 }}
            >
                <p>O usuario descreveu está se sentindo - {setEmotionStr(registro.value_humor)}</p>
            </div>

            <TitleThree>Anotação realizada</TitleThree>

            <div className={styles.container_notes} >
                <div className={styles.triangulo} ></div>
                <div className={styles.note} >
                    <p>{registro.anotacao}</p>
                    <div className={styles.dobra} ></div>
                </div>
            </div>

        </Page>
    )
}