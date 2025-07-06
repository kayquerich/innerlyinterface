import styles from '../styles/formulario.module.css'
import { Title, Subtitle, Link, Warning } from '../components/Text'
import { Input } from '../components/Input'
import { ButtonSubmit } from '../components/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from '../components/Container'
import { ImageLogin } from '../components/Imagens'

export default function Login () {

    const navigation = useNavigate() 

    const [dados, setDados] = useState({})
    const [isProfissional, setProfissional] = useState(false)

    const onHandleChange = (e) => {
        setDados({...dados, [e.target.name] : e.target.value})
    }

    const onHandleClick = () => {
        if (!isProfissional){
            navigation('registros')
        } else {
            navigation('profissional/home')
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