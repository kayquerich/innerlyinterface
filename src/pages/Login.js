import styles from '../styles/formulario.module.css'
import { Title, Subtitle, Link, Warning } from '../components/Text'
import { Input } from '../components/Input'
import { ButtonSubmit } from '../components/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from '../components/Container'
import { ImageLogin } from '../components/Imagens'
import { login } from '../services/Autenticacao'

export default function Login () {

    const navigation = useNavigate() 

    const [dados, setDados] = useState({})

    const onHandleChange = (e) => {
        setDados({...dados, [e.target.name] : e.target.value})
    }

    const invalid_credencials = (response) => {
        setIcorrect(true)
        setMessage(response.message)
        setInterval(() => {
            setIcorrect(false)
        }, 3000)
    }

    const onHandleClick = async () => {
        const response = await login(dados)

        if (response.token) {

            if (!response.isprouser) {
                navigation('/registros', { state : response })
            } else {
                navigation('/profissional/home', { state : response })
            }
            
        } else {
            console.log(response)
            invalid_credencials(response)
        }
    }

    const [isIncorrect, setIcorrect] = useState(false)
    const [errorMessage, setMessage] = useState()

    return (
        <Page>
            <div style={{flexDirection : 'row', justifyContent : 'space-between', display : 'flex', height : '100%', width : '100%'}}>

                <ImageLogin/>

                <div className={styles.loginform}>

                    <Title>Innerly</Title>

                    <Subtitle>Registro de emoções e bem-estar</Subtitle>

                    <Input
                        id='email'
                        name='email'
                        placeholder='Email'
                        type='email'
                        handleChange={onHandleChange}
                        styleType='login'
                        icon='envelope'
                    />
                    <Input
                        id='senha'
                        name='senha'
                        placeholder='Senha'
                        type='password'
                        handleChange={onHandleChange}
                        styleType='senha'
                        icon='lock'
                    />

                    <Warning boolean={isIncorrect}>{errorMessage}</Warning>

                    <ButtonSubmit text='acessar' handleClick={onHandleClick}/>
                    <Link path={'/cadastro'} >Não tem uma conta? Cadastre-se</Link>
                    
                </div>

            </div>
        </Page>
    )
}