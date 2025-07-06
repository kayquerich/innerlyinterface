import { Page } from '../components/Container'
import { FormularioCadastro as Formulario } from '../components/Formulario'
import { CadastroTitle } from '../components/Text'
import { ImageWave } from '../components/Imagens'

export default function Cadastro () {

    const onHandleSubmit = (dados) => {
        console.log(dados)
    }

    return (
        <Page>

            <div style={{alignItems : 'center', flexDirection : 'column', paddingTop : '2.5em', display : 'flex', width : '100%', height : '100%'}}>

                <CadastroTitle />

                <Formulario onHandleSubmit={onHandleSubmit} />

            </div>

            <ImageWave/>

        </Page>
    )
}

