import styles from '../styles/global.module.css'
import inputStyles from '../styles/input.module.css'
import onda from '../assets/onda-cut.png'
import { Input, DateInput } from '../components/Input'
import { ButtonSubmit } from '../components/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cadastro () {

    const navigation = useNavigate()

    const [isProUser, setIsProUser] = useState(false)
    const [linkText, setLinkText] = useState('Sou profissional da saúde mental! clique aqui!')

    const [dadosUsuario, setDadosUsuario] = useState({})

    const onHandleChange = (e) => {
        setDadosUsuario({...dadosUsuario, [e.target.name] : e.target.value})
    }

    const onHandleDateChange = (e) => {
        setDadosUsuario({...dadosUsuario, 'datanascimento' : e})
    }

    const onHandleSubmit = () => {
        console.log(dadosUsuario)
    }

    const onHandleClickLink = () => {

        if (isProUser) {
            setLinkText('Sou profissional da saúde mental! clique aqui!')
        } else {
            setLinkText('Sou usuario comum! clique aqui!')
        }
        
        setIsProUser(!isProUser)
    }

    return (
        <div className={styles.pages}>
            <div className={styles.content} style={{alignItems : 'center', flexDirection : 'column'}}>
                <header style={{marginBottom : '1.5em'}}>
                    <h1 className={styles.title}>Innerly</h1>
                </header>
                <div className={inputStyles.cadastroform}>
                    
                    <p style={{fontSize : '1.5em'}}>Cadastre-se</p>

                    {isProUser ? <Input
                        id='identificador'
                        name='identificador'
                        placeholder='CRM/CRP'
                        type='text'
                        handleChange={onHandleChange}
                    /> : <></>}

                    <Input
                        id='nome'
                        name='nome'
                        placeholder='Nome'
                        type='text'
                        handleChange={onHandleChange}
                    />
                    <Input
                        id='email'
                        name='email'
                        placeholder='Email'
                        type='email'
                        handleChange={onHandleChange}
                    />
                    <DateInput text='Data de nascimento' handleChange={onHandleDateChange}/>
                    <Input
                        id='senha'
                        name='senha'
                        placeholder='Senha'
                        type='password'
                        handleChange={onHandleChange}
                    />
                    <ButtonSubmit text='cadastrar' handleClick={onHandleSubmit}/>
                    <p className={styles.link} onClick={onHandleClickLink}>{linkText}</p>
                    <p>-------------------------- ou --------------------------</p>
                    <p className={styles.link} onClick={() => navigation(-1)}>Já tenho uma conta</p>
                </div>
            </div>
            
            <img src={onda} alt="imagem de uma onda" className={styles.wave}/>
        </div>
    )
}