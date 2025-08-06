import { Page } from '../components/Container'
import { Line, Link, Title, TitleForm } from '../components/Text'
import { useNavigate } from 'react-router-dom'
import { cadastroUsuario } from '../services/Usuarios'
import styles from '../styles/cadastro.module.css'
import { DateInput, Input, RadioInput } from '../components/Input'
import { useState } from 'react'
import { Clickable } from '../components/Button'
import shape from '../assets/onda-cut.png'

export default function Cadastro () {

    const navigation = useNavigate()

    const [dados, setDados] = useState({})
    const handleChange = (e) => {
        setDados({...dados, [e.target.name] : e.target.value})
    }

    const genderChange = (e) => {
        setDados({...dados, 'genero' : e})
    }

    const dateChange = (e) => {
        setDados({...dados, 'nascimento' : e})
    }

    const handleSubmit = async () => {
        const response = await cadastroUsuario(dados)
        if (response.criado) {
            alert('Cadastro realizado com sucesso!')
            navigation('/')
        }
    }

    return (
        <Page>

            <div className={styles.container} >

                <Title>Innerly</Title>

                <div className={styles.container_formulario}>

                    <TitleForm>Cadastre-se</TitleForm>
                    <Line/>

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

                    <Clickable color='var(--blue-green)' action={handleSubmit} >
                        Cadastrar
                    </Clickable>

                    <Link path='/profissional/cadastro' >Sou um profissional da saúde mental, clique aqui!</Link>

                    <div className={styles.line}><Line/><span>ou</span><Line/></div>

                    <Link path={'/'} >Já tenho uma conta!</Link>

                </div>

                <div className={styles.container_imagem} >
                    <img src={shape} alt="imagem de uma onda da tela de cadastro"/>
                </div>

            </div>

        </Page>
    )
}

