import { useLocation, useNavigate } from "react-router-dom";
import { InternalPage as Page } from "../components/Container"
import { AnotationInput, EmotionInput } from "../components/Input"
import { Clickable, VoltarPagina } from "../components/Button";
import { Separator, Subtitle } from "../components/Text";
import { useState } from "react";
import { updateRegistro } from "../services/Usuarios";

export default function Detalhes () {

    const location = useLocation()

    const {registro, usuario} = location.state

    const [update_data, set_update_data] = useState({
        id : registro.id,
        usuario : registro.usuario,
        value_humor : registro.value_humor,
        anotacao : registro.anotacao
    })

    const navigation = useNavigate()

    const onHandleClick = async () => {
        
        const registro_alterado = await updateRegistro(update_data, usuario.token)

        if (registro_alterado) {
            save_registro(registro_alterado.novo_registro)
            navigation('/registros')
        }

    }

    const [mexeu, setMexeu] = useState(false)

    const onEmotionChange = (e) => {
        set_update_data({...update_data, 'value_humor' : e})
        setMexeu(true)
    }

    const alterAnotation = (e) => {
        set_update_data({...update_data, 'anotacao' : e.target.value})
        setMexeu(true)
    }

    return (
        <Page dados={usuario}>

            <header style={{ display : 'flex', gap : 20 }} >
                <VoltarPagina/>
                <Subtitle>{registro.title}</Subtitle>
            </header>

            <Separator margin={30}/>

            <Subtitle>Como está se sentindo?</Subtitle>  
            <Separator margin={10}/>     
            <EmotionInput valuehumor={registro ? registro.value_humor + 1 : - 1} handleChange={onEmotionChange} />
            <Separator margin={20}/>

            <Subtitle>Anotação</Subtitle>
            <Separator margin={10}/>
            <AnotationInput value={update_data.anotacao} handleChange={alterAnotation}/>
            <Separator margin={30}/>

            {mexeu && (
                <Clickable action={onHandleClick} color='var(--blue-green)' >
                    Alterar
                </Clickable>
            )}

        </Page>
    )
}

function save_registro (registro_atualizado) {

    const saved_registros = JSON.parse(sessionStorage.getItem('registros') || '[]')

    const registros = saved_registros.map(registro => {
        console.log('id do registro normal: ' + registro.id + ' id do registro atualizado: ' + registro_atualizado.id)
        if (registro.id === registro_atualizado.id) {
            return registro_atualizado
        }
        return registro
    })

    sessionStorage.setItem('registros', JSON.stringify(registros))

}