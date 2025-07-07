import styles from '../../styles/styles-profissional/details.module.css'
import { useLocation } from "react-router-dom"
import { InternalPage as Page } from "../../components/Container"
import { Title, Subtitle, Separator } from "../../components/Text"
import { UserDetails } from "../../components/Card"
import { model_usuario } from "../../assets/dados"

export default function FileRegistro () {
    
    const location = useLocation()
    const { registro, dados } = location.state 
    
    return (
        <Page dadosUsuario={dados}>

            <Title>Detalhes</Title>
            <Separator margin={20}/>

            <Subtitle>Acompanhado</Subtitle>
            <Separator margin={10}/>
            <UserDetails dados={model_usuario}/> {/* os dados partirão de uma consulta aos usuario com base no id do registro*/}
            <Separator margin={20}/>


        </Page>
    )
}