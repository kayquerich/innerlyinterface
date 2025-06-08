import styles from '../styles/modal.module.css'
import perfilImage from '../assets/images/perfil-static-icon.png'
import { Input } from './Input'
import { useState } from 'react'
import { ButtonSubmit } from './Button'

export function EditarUsuario ({data, close}) {

    const [dadosUsuario, setDadosUsuario] = useState(data)

    const onHandleChange = (e) => {
        setDadosUsuario({...dadosUsuario, 'contato' : e.target.value})
    }

    const onHandleSubmit = () => {
        console.log(dadosUsuario)
        close()
    }

    return (
        <div className={styles.container}>
            <div className={styles.imagearea}>
                <img src={perfilImage} alt="foto de perfil estática" className={styles.profilepic} />
            </div>
            <div className={styles.infosarea}>
                <h1 className={styles.nameuser}>{data.nome}</h1>
                <div className={styles.inputsarea}>
                    <div className={styles.boxinput}>
                        <span>Contato</span>
                        <Input 
                            id='contato'
                            name='contato'
                            styleType='edit'
                            type='text'
                            placeholder='Contato'
                            value={dadosUsuario.contato}
                            handleChange={onHandleChange}
                        />
                    </div>
                </div>
                <div className={styles.containerbutton}>
                    <ButtonSubmit text='enviar' handleClick={onHandleSubmit}/>
                </div>
            </div>
        </div>
    )
}