import styles from '../styles/global.module.css'
import inputStyles from '../styles/input.module.css'
import onda from '../assets/onda-cut.png'
import { Input, DateInput } from '../components/Input'
import { ButtonSubmit } from '../components/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from '../components/Container'
import 'nprogress/nprogress.css'
import nProgress from 'nprogress'
import pstyles from '../styles/cadastro.module.css'

export default function Cadastro () {

    const navigation = useNavigate()

    const [isProUser, setIsProUser] = useState(false)
    const [dadosCadastro, setDadosCadastro] = useState()

    const onHandleSubmit = (dados) => {
        setDadosCadastro(dados)
        console.log(dados)
        console.log(dadosCadastro)
    }

    /*const onHandleSubmit = async () => {
        nProgress.start()
        
        if (!isProUser) {

            await fetch('https://innerlyapi.onrender.com/usuarios/create', {
                method : 'POST',
                headers : {'Content-Type': 'application/json'},
                body : JSON.stringify(dadosUsuario),
            }).then(async (data) => {
                data = await data.json()

                if (data.criado) {
                    alert('Cadastro realizado com sucesso')
                    navigation('/')
                } else {
                    alert('Não foi possivel fazer o cadastro')
                }

            })

        } else {
            alert('Ainda não é possivel se cadastrar como profissional da saúde')
        }

        nProgress.done()
    }*/

    const [linkText, setLinkText] = useState('Sou profissional da saúde mental! clique aqui!')


    const onHandleClickLink = () => {

        if (isProUser) {
            setLinkText('Sou profissional da saúde mental! clique aqui!')
        } else {
            setLinkText('Sou usuario comum! clique aqui!')
        }
        
        setIsProUser(!isProUser)
    }

    return (
        <Page>

            <div className={styles.content} style={{alignItems : 'center', flexDirection : 'column', paddingTop : '2.5em'}}>

                <header style={{marginBottom : '1.5em'}}>
                    <h1 className={styles.title}>Innerly</h1>
                </header>

                {!isProUser ? (

                    <FormularioUsuario
                        onHandleSubmit={onHandleSubmit}
                        onHandleClickLink={onHandleClickLink}
                        linkText={linkText}
                        navigation={navigation}
                    />  

                ) : (
                    <FormularioProfissional
                        onHandleSubmit={onHandleSubmit}
                        onHandleClickLink={onHandleClickLink}
                        linkText={linkText}
                        navigation={navigation}
                    />
                )}

            </div>
            
            <img src={onda} alt="imagem de uma onda" className={styles.wave}/>

        </Page>
    )
}

function FormularioUsuario({onHandleSubmit, onHandleClickLink, linkText, navigation}) {

    const [dadosUsuario, setDadosUsuario] = useState({})

    const onHandleChange = (e) => {
        setDadosUsuario({...dadosUsuario, [e.target.name] : e.target.value})
    }

    const onHandleDateChange = (e) => {
        setDadosUsuario({...dadosUsuario, 'nascimento' : e})
    }

    return (
        <div className={inputStyles.cadastroform}>
                    
            <p style={{fontSize : '1.5em'}}>Cadastre-se</p>

            <Input
                id='nome'
                name='nome'
                placeholder='Nome'
                type='text'
                handleChange={onHandleChange}
                icon='user'
            />
            <Input
                id='username'
                name='username'
                placeholder='Username'
                type='text'
                handleChange={onHandleChange}
                icon='user-tag'
            />
            <Input
                id='email'
                name='email'
                placeholder='Email'
                type='email'
                handleChange={onHandleChange}
                icon='envelope'
            />
            <DateInput text='Data de nascimento' handleChange={onHandleDateChange}/>
            <Input
                id='senha'
                name='senha'
                placeholder='Senha'
                type='password'
                handleChange={onHandleChange}
                icon='lock'
                styleType='senhac'
            />
            <ButtonSubmit text='cadastrar' handleClick={() => onHandleSubmit(dadosUsuario)}/>
            <p className={styles.link} onClick={onHandleClickLink}>{linkText}</p>
            <p>--------------------- ou ---------------------</p>
            <p className={styles.link} onClick={() => navigation(-1)}>Já tenho uma conta</p>
        </div>
    )
}

function FormularioProfissional({onHandleSubmit, onHandleClickLink, linkText, navigation}) {

    const [profissional, setProfissional] = useState({})

    const onHandleChange = (e) => {
        setProfissional({...profissional, [e.target.name] : e.target.value})
    }

    const onHandleDateChange = (e) => {
        setProfissional({...profissional, 'nascimento' : e})
    }

    return (
        <div className={pstyles.containerforms} >
            <div className={pstyles.internalcontainer} >

                <h2 style={{color : '#6161d7', fontWeight : 'bolder'}}>Cadastre-se</h2>

                <hr style={{ border: '1px solid #ccc', margin: '10px 0', width : '100%' }} />

                <h3 className={pstyles.title}>Informações pessoais</h3>

                <div className={pstyles.containerinput}>
                    <Input
                        id='nome'
                        name='nome'
                        type='text'
                        placeholder='Nome'
                        icon='user'
                        styleType='login'
                        handleChange={onHandleChange}
                    />
                    
                    <Input
                        id='nome'
                        name='nome'
                        type='text'
                        placeholder='Nome'
                        icon='user-tag'
                        styleType='login'
                        handleChange={onHandleChange}
                    />

                    <Input 
                        id='email'
                        name='email'
                        type='email'
                        placeholder='Email'
                        icon='envelope'
                        styleType='login'
                        handleChange={onHandleChange}
                    />
                    <DateInput text='Data de Nascimento' handleChange={onHandleDateChange}/>
                    <Input
                        id='senha'
                        name='senha'
                        type='password'
                        placeholder='Senha'
                        icon='lock'
                        styleType='senha'
                        handleChange={onHandleChange}
                    />
                </div>

            </div>
            <div className={pstyles.internalcontainer} style={{height : '85%'}}>

                <h3 className={pstyles.title}>Informações Profissionais</h3>
                <hr style={{ border: '1px solid #ccc', margin: '10px 0', width : '100%' }} />

                <div className={pstyles.containerinput}>
                    <Input
                        id='concelho'
                        name='concelho'
                        type='text'
                        placeholder='Concelho onde é registrado'
                        icon='notes-medical'
                        styleType='login'
                        handleChange={onHandleChange}
                    />
                    <Input
                        id='regiap'
                        name='regiao'
                        type='text'
                        placeholder='Região onde é registrado'
                        icon='house-medical-flag'
                        styleType='login'
                        handleChange={onHandleChange}
                    />
                    <Input
                        id='registro'
                        name='registro'
                        type='text'
                        placeholder='Numero de registro'
                        icon='file-medical'
                        styleType='login'
                        handleChange={onHandleChange}
                    />

                </div>

                <div style={{marginBlock : 10}}></div>

                <div style={{display : 'flex', flexDirection : 'column', gap : 10, alignItems : 'center'}}>
                    <ButtonSubmit text='cadastrar' handleClick={() => onHandleSubmit(profissional)}/>
                    <p className={styles.link} onClick={onHandleClickLink}>{linkText}</p>
                    <p>--------------------- ou ---------------------</p>
                    <p className={styles.link} onClick={() => navigation(-1)}>Já tenho uma conta</p>
                </div>

            </div>
        </div>
    )
}