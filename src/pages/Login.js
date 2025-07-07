import styles from '../styles/formulario.module.css'
import { Title, Subtitle, Link, Warning } from '../components/Text'
import { Input } from '../components/Input'
import { ButtonSubmit } from '../components/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from '../components/Container'
import { ImageLogin } from '../components/Imagens'

import { model_profissional, model_usuario } from '../assets/dados'

export default function Login () {

    const navigation = useNavigate() 

    const [dados, setDados] = useState({})

    const onHandleChange = (e) => {
        setDados({...dados, [e.target.name] : e.target.value})
    }

    const onHandleClick = () => {
        if (dados.email === model_usuario.email){
            navigation('registros', { state : model_usuario })
        } else if (dados.email === model_profissional.email){
            navigation('profissional/home', { state : model_profissional })
        } else {
            setIcorrect(true)
            setInterval(() => {
                setIcorrect(false)
            }, 3000)
        }
    }

    const [isIncorrect, setIcorrect] = useState(false)

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

                    <Warning boolean={isIncorrect}/>

                    <ButtonSubmit text='acessar' handleClick={onHandleClick}/>
                    <Link path={'/cadastro'} >Não tem uma conta? Cadastre-se</Link>
                    
                </div>

            </div>
        </Page>
    )
}