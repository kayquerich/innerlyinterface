import styles from '../styles/login.module.css'
import { Title, Subtitle, Link, Warning, Separator } from '../components/Text'
import { Input } from '../components/Input'
import { Clickable } from '../components/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from '../components/Container'
import { login } from '../services/Autenticacao'
import imagem from '../assets/images/login-image.png'
import responsive_image from '../assets/images/image-login-responsive.png'

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
            <div className={styles.container} >
                <div className={styles.container_imagem} >
                    <img src={imagem} alt="imagem da tela de login" />
                </div>
                <div className={styles.container_formulario} >
                    
                    <Title>Innerly</Title>
                    <Subtitle>Registro de emoções e bem estar!</Subtitle>

                    <div className={styles.formulario} >

                        <Input
                            name='email'
                            id='email'
                            icon='envelope'
                            styleType='login'
                            placeholder='Seu email...'
                            type='email'
                            handleChange={onHandleChange}
                        />

                        <Input
                            name='senha'
                            id='senha'
                            icon='lock'
                            styleType='senha'
                            type='password'
                            placeholder='Informe sua senha...'
                            handleChange={onHandleChange}
                        />

                        <Warning boolean={isIncorrect}>{errorMessage}</Warning>

                    </div>

                    <Clickable color='var(--blue-green)' action={onHandleClick} >
                        acessar
                    </Clickable>

                    <Separator margin={10} />
                    <Link path='/cadastro' >Não tem uma conta? Cadastre-se!</Link>

                </div>
                <div className={styles.responsive_image} >
                    <img src={responsive_image} alt="" />
                </div>
            </div>    
        </Page>
    )
}