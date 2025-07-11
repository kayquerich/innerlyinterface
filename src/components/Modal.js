import styles from '../styles/modal.module.css'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { RadioInput, Input } from './Input'
import { useState } from 'react'
import { updateUsuario } from '../services/Usuarios'

export function UserEditPage ({close}) {

    const saved_usuario = JSON.parse(sessionStorage.getItem('usuario'))
    const [dados, setDados] = useState({
        'nome' : saved_usuario.nome,
        'contato' : saved_usuario.contato,
        'genero' : saved_usuario.genero,
        'biografia' : saved_usuario.biografia
    })

    const onHandleChange = (e) => {
        setDados({...dados, [e.target.name] : e.target.value})
    }

    const onHandleSubmit = async () => {
        
        const response = await updateUsuario(dados, saved_usuario.token)

        if (response) {
            close()
        }

    }

    const onGenderChange = (e) => {
        setDados({...dados, 'genero' : e})
    }

    return (
        <div className={styles.page} >

            <div className={styles.editcontainer} >

                <h3 className={styles.title} >Alterar informações pessoais</h3>
                <hr style={{ border: '1px solid #ccc', margin: '10px 0' }}/>

                <div className={styles.container}>

                    <div className={styles.containerinput}>
                        <p>Nome</p>
                        <Input id='nome' name='nome' value={dados.nome} styleType='edit' handleChange={onHandleChange} placeholder='Seu nome...'/>
                    </div>
                    <div className={styles.containerinput}>
                        <p>Contato</p>
                        <Input id='contato' name='contato' value={dados.contato} styleType='edit' handleChange={onHandleChange} placeholder='Seu Contato...'/>
                    </div>

                    <div style={{width : '350px'}}>
                        <RadioInput 
                            handleChange={onGenderChange}
                            options={['masculino', 'feminino', 'outro']}
                            title='Gênero'
                            checked_value={dados.genero}
                            initial_value={dados.genero}
                        />
                    </div>

                    <div className={styles.containerinput}>
                        <p>Biografia</p>
                        <textarea
                            placeholder='Escreva um pouco sobre você...'
                            className={styles.textarea}
                            name='biografia'
                            onChange={onHandleChange}
                        >
                            {dados.biografia}
                        </textarea>
                    </div>

                </div>

                <button onClick={onHandleSubmit} className={styles.submit}>
                    Alterar
                </button>

            </div>

            <button className={styles.close} onClick={close}>
                <Icon icon='xmark'/>
            </button>
        </div>
    )
}