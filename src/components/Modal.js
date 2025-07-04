import styles from '../styles/modal.module.css'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { Input } from './Input'
import { useState } from 'react'

export function UserEditPage ({dadosUsuario, close}) {

    const [dados, setDados] = useState(dadosUsuario)

    const onHandleChange = (e) => {
        setDados({...dados, [e.target.name] : e.target.value})
    }

    const onHandleSubmit = () => {
        close()
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
                        <Input id='contato' name='Contato' value={dados.contato} styleType='edit' handleChange={onHandleChange} placeholder='Seu Contato...'/>
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