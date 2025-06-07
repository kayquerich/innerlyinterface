import { useLocation, useNavigate } from "react-router-dom";
import { InternalPage as Page } from "../components/Container";
import styles from '../styles/global.module.css'
import { AnotationInput, EmotionInput } from "../components/Input";
import { ButtonSubmit } from "../components/Button";

export default function Detalhes () {

    const location = useLocation()
    const {registro, dadosUsuario} = location.state

    const navigation = useNavigate()

    const onHandleClick = () => {
        navigation('/registros')
    }

    return (
        <Page dadosUsuario={dadosUsuario}>
            <h1 className={styles.title}>Detalhes - {registro.title}</h1>
            <div className={styles.mediumsep}></div>

            <h2 className={styles.subtitle}>Como está se sentido?</h2>
            <div className={styles.smallsep}></div>
            <EmotionInput valuehumor={registro ? registro.valuehumor : -1}/>
            <div className={styles.mediumsep}></div>

            <h2 className={styles.subtitle} >Anotação</h2>
            <div className={styles.smallsep}></div>
            <AnotationInput value={registro.description}/>
            <div className={styles.mediumsep}></div>

            <ButtonSubmit text='enviar' handleClick={onHandleClick}/>
        </Page>
    )
}