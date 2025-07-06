import { useLocation, useNavigate } from "react-router-dom";
import { InternalPage as Page } from "../components/Container"
import { AnotationInput, EmotionInput } from "../components/Input"
import { ButtonSubmit } from "../components/Button";
import { Separator, Subtitle, Title } from "../components/Text";

export default function Detalhes () {

    const location = useLocation()

    const {registro, dadosUsuario} = location.state

    const navigation = useNavigate()

    const onHandleClick = () => {
        navigation('/registros')
    }

    return (
        <Page dadosUsuario={dadosUsuario}>

            <Title>Detalhes - {registro.title}</Title>
            <Separator margin={30}/>

            <Subtitle>Como está se sentindo?</Subtitle>  
            <Separator margin={10}/>     
            <EmotionInput valuehumor={registro ? registro.valuehumor : -1}/>
            <Separator margin={20}/>

            <Subtitle>Anotação</Subtitle>
            <Separator margin={10}/>
            <AnotationInput value={registro.description}/>
            <Separator margin={30}/>

            <ButtonSubmit text='enviar' handleClick={onHandleClick}/>

        </Page>
    )
}