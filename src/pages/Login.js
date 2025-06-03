import styles from '../styles/global.module.css'
import styleInput from '../styles/input.module.css'
import { Title, Subtitle } from '../components/Text'
import onda from '../assets/onda-cut.png'
import { Input } from '../components/Input'
import { ButtonSubmit } from '../components/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login () {

    const navigation = useNavigate() 

    const [dadosUsuario, setDadosUsuario] = useState({})

    const onHandleChange = (e) => {
        setDadosUsuario({...dadosUsuario, [e.target.name] : e.target.value})
    }

    const onHandleClick = () => {
        console.log(dadosUsuario)
    }

    return (
        <div className={styles.pages}>
            <div className={styles.content} style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                <div style={{width : '50%'}}>
                    <Title text='Innerly'/>
                    <Subtitle text='Registro de emoções e bem estar'/>
                </div>
                <div className={styleInput.inputform}>
                    <Input
                        id='email'
                        name='email'
                        placeholder='Email'
                        type='email'
                        handleChange={onHandleChange}
                    />
                    <Input
                        id='senha'
                        name='senha'
                        placeholder='Senha'
                        type='password'
                        handleChange={onHandleChange}
                    />
                    <ButtonSubmit text='acessar' handleClick={onHandleClick}/>
                    <p onClick={() => navigation('/cadastro')} className={styles.link}>Não tem uma conta? Cadastre-se!</p>
                </div>
            </div>
            <img src={onda} alt="imagem de uma onda" className={styles.wave}/>
        </div>
    )
}