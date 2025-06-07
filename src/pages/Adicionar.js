import { useNavigate } from "react-router-dom"
import { ButtonSubmit } from "../components/Button"
import { InternalPage as Page } from "../components/Container"
import { AnotationInput, DateInput, EmotionInput } from "../components/Input"
import global from '../styles/global.module.css'

export default function Adicionar () {

    const navigation = useNavigate()

    const data = {
        nome : 'Kayque Richarlyson',
        email : 'kayque@email.com',
        senha : 'senha123',
        contato : '(87) 9 9101-0743' 
    }

    const onEmotionChange = (e) => {
        console.log(e)
    }

    const onHandleSubmit = () => {
        navigation('/registros', data)
    }

    return (
        <Page dadosUsuario={data}>

            <h1 className={global.title}>Adicionar registro</h1>
            <div className={global.mediumsep}></div>

            <h2 className={global.subtitle}>Como está se sentindo?</h2>
            <div className={global.smallsep}></div>
            <EmotionInput handleChange={onEmotionChange}/>
            <div className={global.mediumsep}></div>

            <h2 className={global.subtitle}>Data do registro</h2>
            <div className={global.smallsep}></div>
            <DateInput/>
            <div className={global.mediumsep}></div>

            <h2 className={global.subtitle}>Anotações</h2>
            <div className={global.smallsep}></div>
            <AnotationInput/>

            <div className={global.souprd}>
                <ButtonSubmit text='enviar' typeStyle='login' handleClick={onHandleSubmit}/>
            </div>
            
        </Page>
    )
}