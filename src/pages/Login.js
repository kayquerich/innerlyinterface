import styles from '../styles/global.module.css'
import styleInput from '../styles/input.module.css'
import { Title, Subtitle } from '../components/Text'
import { Input } from '../components/Input'
import { ButtonSubmit } from '../components/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import onda from '../assets/onda-cut.png'
import { Page } from '../components/Container'
import 'nprogress/nprogress.css'
import nProgress from 'nprogress'

export default function Login () {

    const navigation = useNavigate() 

    const [dadosUsuario, setDadosUsuario] = useState({})

    const onHandleChange = (e) => {
        setDadosUsuario({...dadosUsuario, [e.target.name] : e.target.value})
    }

    const onHandleClick = () => {
        navigation('registros')
    }

    /*const onHandleClick = async () => {

        nProgress.start()

        await fetch('https://innerlyapi.onrender.com/usuarios/login', {
            method : 'POST',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify(dadosUsuario),
        }).then(async (data) => {

            let dados = await data.json()
            
            if (dados.token) {
                navigation('registros', {state : {
                    token : dados.token
                }})
            } else {
                setIcorrect(true)
                setTimeout(() => {
                    setIcorrect(false)
                }, 2000)
            }

        }).catch((error) => {
            alert('erro no login')
        })

        nProgress.done()

    }*/

    const [isIncorrect, setIcorrect] = useState(false)

    return (
        <Page>
            <div className={styles.content} style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                <div className={styles.imagelogin}>
                    
                </div>
                <div className={styleInput.inputform}>
                    <Title text='Innerly'/>
                    <Subtitle text='Registro de emoções e bem estar'/>
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

                    {isIncorrect ? (
                        <div className={styleInput.warning}>email ou senha incorretos*</div>
                    ) : <></>}

                    <ButtonSubmit text='acessar' handleClick={onHandleClick}/>
                    <p onClick={() => navigation('/cadastro')} className={styles.link}>Não tem uma conta? Cadastre-se!</p>
                    
                </div>

                <img src={onda} alt="imagem de onda" className={styles.wavelogin} />
            </div>
        </Page>
    )
}