import { useState } from "react"
import { Page } from "../../components/Container"
import { Line, Link, Title, TitleForm } from "../../components/Text"
import { Input, RadioInput, DateInput, Picker } from "../../components/Input"
import { concelhos, ufs } from "../../assets/dados"
import { Clickable } from "../../components/Button"
import { cadastroProfissional } from "../../services/Profissionais"
import { useNavigate } from "react-router-dom"
import shape from '../../assets/onda-cut.png'
import styles from '../../styles/cadastro.module.css'

export default function CadastroProfissional () {

    const [dados, setDados] = useState({})
    const navigation = useNavigate()
    
    const handleChange = (e) => {
        setDados({...dados, [e.target.name] : e.target.value})
    }

    const dateChange = (e) => {
        setDados({...dados, 'nascimento' : e})
    }

    const genderChange = (e) => {
        setDados({...dados, 'genero' : e})
    }

    const countyChange = (e) => {
        setDados({...dados, 'concelho' : e})
    }

    const countryChange = (e) => {
        setDados({...dados, 'regiao' : e})
    }

    const handleSubmit = async () => {
        const response = await cadastroProfissional(dados)
        if (response.criado) {
            alert('Cadastro realizado com sucesso!')
            navigation('/')
        }
    }

    return (
        <Page>
            <div className={styles.container} >

                <Title>Innerly</Title>

                <div className={styles.formulario_area}>
                    <div className={styles.container_formulario} >

                        <TitleForm>Cadastre-se</TitleForm>
                        <Line/>
                        <p style={{ marginTop : -15, marginBottom : 10}} >Informações Pessoais</p>

                        <Input
                            name='nome'
                            id='nome'
                            icon='user'
                            styleType='cadastro'
                            placeholder='Seu nome...'
                            type='text'
                            handleChange={handleChange}
                        />

                        <Input
                            name='username'
                            id='username'
                            icon='user-tag'
                            styleType='cadastro'
                            placeholder='crie um nome de usuario...'
                            type='text'
                            handleChange={handleChange}
                        />

                        <Input
                            name='email'
                            id='email'
                            icon='envelope'
                            styleType='cadastro'
                            placeholder='Seu email...'
                            type='email'
                            handleChange={handleChange}
                        />

                        <RadioInput
                            title='Gênero'
                            options={['masculino', 'feminino', 'outro']}
                            handleChange={genderChange}
                        />

                        <DateInput
                            text='Data de nascimento'
                            handleChange={dateChange}
                        />

                        <Input
                            name='senha'
                            id='senha'
                            icon='lock'
                            type='password'
                            handleChange={handleChange}
                            placeholder='Crie uma senha...'
                            styleType='senhac'
                        />

                    </div>
                    <div className={styles.container_formulario} style={{ height : 'fit-content' }}>
                        
                        <p>Informações Profissionais</p>
                        
                        <Line/>

                        <Picker
                            custom_styles={{height : '50px', width : '300px'}}
                            icon='notes-medical'
                            options={concelhos}
                            handleChange={countyChange}
                            placeholder='Concelho onde é registrado...'
                            options_width='350px'
                        />
                        
                        <Picker
                            custom_styles={{height : '50px', width : '300px'}}
                            icon='house'
                            options={ufs}
                            handleChange={countryChange}
                            placeholder='Região onde é registrado...'
                            options_width='350px'
                        />

                        <Input
                            name='registro'
                            id='registro'
                            icon='file-medical'
                            styleType='login'
                            placeholder='Numero do registro'
                            type='text'
                            handleChange={handleChange}
                        />

                        <Clickable color='var(--blue-green)' action={handleSubmit} >
                            Cadastrar
                        </Clickable>

                        <Link path='/cadastro' >Sou usuario comum, clique aqui!</Link>

                        <div className={styles.line}><Line/><span>ou</span><Line/></div>

                        <Link path={'/'} >Já tenho uma conta!</Link>

                    </div>
                </div>

                <div className={styles.container_imagem} >
                    <img src={shape} alt="imagem de uma onda da tela de cadastro" />
                </div>
            </div>
        </Page>
    )
}