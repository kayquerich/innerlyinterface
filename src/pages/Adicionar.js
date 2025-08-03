import { useLocation, useNavigate } from "react-router-dom"
import { Clickable, VoltarPagina} from "../components/Button";
import { InternalPage as Page } from "../components/Container"
import { AnotationInput, DateInput, EmotionInput } from '../components/Input';
import { Subtitle, Separator } from "../components/Text";
import { useState } from "react";
import { createRegistro } from "../services/Usuarios";

export default function Adicionar () {

    const saved = sessionStorage.getItem('registros')
    const saved_registros = saved ? JSON.parse(saved) : []

    const navigation = useNavigate()

    const location = useLocation()
    const dados = location.state

    const [registro, setRegistro] = useState()

    const onEmotionChange = (e) => {
        setRegistro({...registro, 'value_humor' : e})
    }

    const onDateChange = (e) => {
        setRegistro({...registro, 'data' : e})
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
            
            <header style={{ display : 'flex', gap : 20 }} >
                <VoltarPagina/>
                <Subtitle>Adicionar registro</Subtitle>
            </header>
            <Separator margin={30}/>

            <Subtitle>Como está se sentindo?</Subtitle>
            <Separator margin={10}/>
            <EmotionInput handleChange={onEmotionChange}/>
            <Separator margin={20}/>

            <Subtitle>Data do registro</Subtitle>
            <Separator margin={10}/>
            <DateInput handleChange={onDateChange} current={true}/>
            <Separator margin={20}/>

            <Subtitle>Anotações</Subtitle>
            <Separator margin={10}/>
            <AnotationInput handleChange={onAnotationChange}/>
            <Separator margin={30}/>

            <Clickable action={onHandleSubmit} color='var(--blue-green)' >
                Adicionar
            </Clickable>
        
        </Page>
    )
}