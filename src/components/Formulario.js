import styles from '../styles/formulario.module.css'
import { useState } from "react"
import { Input, DateInput, Picker, RadioInput } from './Input'
import { ButtonSubmit } from './Button'
import { ChangePageLink, Line, Link, TitleForm, SubtitleForm, Separator } from './Text'
import { concelhos, ufs } from '../assets/dados'

export function FormularioCadastro ({onHandleSubmit}) {

    const [dados, setDados] = useState({})
    const [isProfissional, setProfissional] = useState(false)

    const onHandleChange = (e) => {
        setDados({...dados, [e.target.name] : e.target.value})
    }

    const onDateChange = (e) => {
        setDados({...dados, 'nascimento' : e})
    }

    const onGenderChange = (e) => {
        setDados({...dados, 'genero' : e})
    }

    const onCountyChange = (e) => {
        setDados({...dados, 'concelho' : e})
    }

    const onCountryChange = (e) => {
        setDados({...dados, 'regiao' : e})
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
                        <RadioInput 
                            title='Gênero'
                            handleChange={onGenderChange}
                            options={['masculino', 'feminino', 'outro']}
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
                        clear_data={setDados}
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
                            id='username'
                            name='username'
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
                        <RadioInput 
                            title='Gênero'
                            handleChange={onGenderChange}
                            options={['masculino', 'feminino', 'outro']}
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

                    <Separator margin={10}/>

                </div>
                <div className={styles.internalcontainer} style={{maxHeight : '380px'}}>

                    <SubtitleForm>Informações profissionais</SubtitleForm>
                    <Line/>

                    <div className={styles.containerinput}>
                        <Picker
                            custom_styles={{height : '50px', width : '300px'}}
                            icon='notes-medical'
                            options={concelhos}
                            handleChange={onCountyChange}
                            placeholder='Concelho onde é registrado...'
                            options_width='350px'
                        />
                        
                        <div style={{display : 'flex', gap : '10px'}}>
 
                            <Picker
                                custom_styles={{height : '50px', width : '60px'}}
                                options={ufs}
                                placeholder='UF'
                                icon='house-medical-flag'
                                options_width='110px'
                                handleChange={onCountryChange}
                            />

                            <Input
                                id='registro'
                                name='registro'
                                type='text'
                                placeholder='Numero de registro'
                                styleType='login'
                                handleChange={onHandleChange}
                                custom_styles={{width : '230px', borderRadius : '5px'}}
                            />

                        </div>
                        

                    </div>

                    <Footer 
                        submit={onHandleSubmit} 
                        change={setProfissional} 
                        boolean={isProfissional} 
                        dados={dados}
                        clear_data={setDados}
                    />

                </div>
            </div>
        )
    }

}

function Footer ({submit, change, boolean, dados, clear_data}) {
    return (
        <div style={{display : 'flex', flexDirection : 'column', gap : 10, alignItems : 'center', marginTop : 20}}>
            <ButtonSubmit text='cadastrar' handleClick={() => submit(dados)}/>
            <ChangePageLink action={change} boolean={boolean} clear_data={clear_data}
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