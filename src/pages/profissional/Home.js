import { useLocation } from "react-router-dom"
import { InternalPage as Page } from "../../components/Container"
import { Subtitle } from "../../components/Text"
import styles from '../../styles/styles-profissional/home.module.css'
import { Registro } from "../../components/Registro"
import { fakeRegistros } from "../../assets/registrosfake"
import { UserCard } from "../../components/Card"
import { usercard_dto } from "../../assets/dados"
import { ScrollView } from "../../components/Scroll"

export default function Home () {

    const location = useLocation()
    const dados = location.state

    return (
        <Page dadosUsuario={dados}>

            <Subtitle>Registros recentes</Subtitle>
            <ScrollView style_name={styles.container_registros}>

                <Registro registro={fakeRegistros[0]} dados={dados}/>
                <Registro registro={fakeRegistros[1]} dados={dados}/>
                <Registro registro={fakeRegistros[2]} dados={dados}/>
                <Registro registro={fakeRegistros[3]} dados={dados}/>
                <Registro registro={fakeRegistros[4]} dados={dados}/>
                <Registro registro={fakeRegistros[5]} dados={dados}/>
                <Registro registro={fakeRegistros[0]} dados={dados}/>
                <Registro registro={fakeRegistros[1]} dados={dados}/>
                <Registro registro={fakeRegistros[2]} dados={dados}/>
                
            </ScrollView>

            <Subtitle>Pessoas acompanhadas</Subtitle>
            <ScrollView style_name={styles.container_usuarios}>
                <UserCard dados={usercard_dto}/>
                <UserCard dados={usercard_dto}/>
                <UserCard dados={usercard_dto}/>
                <UserCard dados={usercard_dto}/>
                <UserCard dados={usercard_dto}/>
            </ScrollView>

        </Page>
    )
}