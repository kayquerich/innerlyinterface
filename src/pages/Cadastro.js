import { Page } from '../components/Container'
import { FormularioCadastro as Formulario } from '../components/Formulario'
import { CadastroTitle } from '../components/Text'
import { ImageWave } from '../components/Imagens'
import { useNavigate } from 'react-router-dom'
import { cadastroUsuario } from '../services/Usuarios'
import { cadastroProfissional } from '../services/Profissionais'

export default function Cadastro () {

    const navigation = useNavigate()

    const foi_criado = (response) => {
        return response ? response.criado : false
    } 

    const onHandleSubmit = async (dados) => {

        const dados_especificos = ['concelho', 'registro', 'regiao']

        const existem = dados_especificos.every(coluna => coluna in dados)

        if (existem) {
            const response = await cadastroProfissional(dados)
            if (foi_criado(response)) {
                alert(response.message)
                navigation('/')
            }
        } else {
            const response = await cadastroUsuario(dados)
            if (foi_criado(response)) {
                alert(response.message)
                navigation('/')
            }
        }
        
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

