import { useLocation, useNavigate } from "react-router-dom"
import { Clickable, VoltarPagina} from "../components/Button";
import { InternalPage as Page } from "../components/Container"
import { AnotationInput, DateInput, EmotionInput } from '../components/Input';
import { Subtitle } from "../components/Text";
import { useState } from "react";
import { createRegistro } from "../services/Usuarios";
import styles from '../styles/adicionar.module.css'
import { getCurrentDate } from "../services/Gadgets";

export default function Adicionar () {

    const saved = sessionStorage.getItem('registros')
    const saved_registros = saved ? JSON.parse(saved) : []

    const navigation = useNavigate()

    const location = useLocation()
    const dados = location.state

    const [registro, setRegistro] = useState({
        data : getCurrentDate()
    })

    const onEmotionChange = (e) => {
        setRegistro({...registro, 'value_humor' : e})
    }

    const onAnotationChange = (e) => {
        setRegistro({...registro, 'anotacao' : e.target.value})
    } 

    const onHandleSubmit = async () => {
    
        const response = await createRegistro(registro, dados.token)

        if (response && response.criado) {
            alert('Registro adicionado!')
            saved_registros.push(response.registro)
            sessionStorage.setItem('registros', JSON.stringify(saved_registros))
            navigation(-1, { state : { parse_usuario : dados } })
        } else {
            alert('Erro na criação do registro')
        }

    }

    return (
        <Page dados={dados}>
            <div className={styles.container} >

                <header>
                    <VoltarPagina/>
                    <Subtitle>Adicionar registro</Subtitle>
                </header>

                <div className={styles.container_input} >
                    <Subtitle>Como está se sentindo?</Subtitle>
                    <EmotionInput handleChange={onEmotionChange}/>
                </div>

                <div className={styles.container_input} >
                    <Subtitle>Anotações</Subtitle>
                    <AnotationInput handleChange={onAnotationChange}/>
                </div>

                <div className={styles.container_button} >
                    <Clickable action={onHandleSubmit} color='var(--blue-green)' >
                        Adicionar
                    </Clickable>
                </div>

            </div>
        </Page>
    )
}