import styles from '../styles/formulario.module.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input, DateInput } from './Input'
import { ButtonSubmit } from './Button'
import { ChangePageLink, Line, Link, TitleForm, SubtitleForm } from './Text'

export function FormularioCadastro ({onHandleSubmit}) {

    const [dados, setDados] = useState({})
    const [isProfissional, setProfissional] = useState(false)

    const onHandleChange = (e) => {
        setDados({...dados, [e.target.name] : e.target.value})
    }

    const onDateChange = (e) => {
        setDados({...dados, 'nascimento' : e})
    }

    if (!isProfissional) {
        return (
            <div className={styles.containerforms}>
                <div className={styles.internalcontainer}>
                
                    <TitleForm>Cadastre-se</TitleForm>

                    <div className={styles.containerinput}>
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
                        <DateInput text='Data de nascimento' handleChange={onDateChange}/>
                        <Input
                            id='senha'
                            name='senha'
                            placeholder='Senha'
                            type='password'
                            handleChange={onHandleChange}
                            icon='lock'
                            styleType='senhac'
                        />
                    </div>

                    <Footer 
                        submit={onHandleSubmit} 
                        change={setProfissional} 
                        boolean={isProfissional} 
                        dados={dados}
                    />

                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.containerforms} >
                <div className={styles.internalcontainer} >

                    <TitleForm>Cadastre-se</TitleForm>
                    <Line/>
                    <SubtitleForm>Informações pessoais</SubtitleForm>

                    <div className={styles.containerinput}>
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
                        <DateInput text='Data de Nascimento' handleChange={onDateChange}/>
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
                <div className={styles.internalcontainer} style={{height : '85%'}}>

                    <SubtitleForm>Informações profissionais</SubtitleForm>
                    <Line/>

                    <div className={styles.containerinput}>
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

                    <Footer 
                        submit={onHandleSubmit} 
                        change={setProfissional} 
                        boolean={isProfissional} 
                        dados={dados}
                    />

                </div>
            </div>
        )
    }

}

function Footer ({submit, change, boolean, dados}) {
    return (
        <div style={{display : 'flex', flexDirection : 'column', gap : 10, alignItems : 'center', marginTop : 20}}>
            <ButtonSubmit text='cadastrar' handleClick={() => submit(dados)}/>
            <ChangePageLink action={change} boolean={boolean}
                texts={[
                    'Sou profissional da saúde mental, clique aqui!', 
                    'Sou usuario comum, clique aqui!'
                ]}
            />
            <p>--------------------- ou ---------------------</p>
            <Link path={-1} >Já tenho uma conta!</Link>
        </div>
    )
}