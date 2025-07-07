import { useLocation, useNavigate } from "react-router-dom"
import { ButtonSubmit} from "../components/Button";
import { InternalPage as Page } from "../components/Container"
import { AnotationInput, DateInput, EmotionInput } from '../components/Input';
import { Subtitle, Title, Separator } from "../components/Text";

export default function Adicionar () {

    const navigation = useNavigate()

    const location = useLocation()
    
    const dados = location.state

    const onEmotionChange = (e) => {
        console.log(e)
    }

    const onHandleSubmit = () => {
        navigation('/registros', { state : dados})
    }

    return (
        <Page dadosUsuario={dados}>

            <Title>Adicionar registro</Title>
            <Separator margin={30}/>

            <Subtitle>Como está se sentindo?</Subtitle>
            <Separator margin={10}/>
            <EmotionInput handleChange={onEmotionChange}/>
            <Separator margin={20}/>

            <Subtitle>Data do registro</Subtitle>
            <Separator margin={10}/>
            <DateInput/>
            <Separator margin={20}/>

            <Subtitle>Anotações</Subtitle>
            <Separator margin={10}/>
            <AnotationInput/>
            <Separator margin={30}/>

            <ButtonSubmit text='enviar' handleClick={onHandleSubmit}/>
            
        </Page>
    )
}