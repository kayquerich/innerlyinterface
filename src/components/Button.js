import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/button.module.css'
import { useNavigate } from 'react-router-dom'

export function ButtonSubmit ({handleClick, text, typeStyle, style}) {
    return (
        <button onClick={handleClick} className={typeStyle === 'login' ? styles.buttonsubmitone : styles.buttonsubmittwo} style={style}>
            {text}
        </button>
    )
}

export function GoToAddRegistro ({dados}) {

    const navigation = useNavigate()

    const onHandleClick = () => {
        navigation('/registros/adicionar', { state : dados })
    }

    return (
        <div onClick={onHandleClick} className={styles.contaddres}>
            <span>Adicionar registro</span>
            <button className={styles.btnaddres}>+</button>
        </div>
    )

}

export function CloseButton ({handleClick}) {
    return (
        <button className={styles.close} onClick={handleClick}>
            <FontAwesomeIcon icon='xmark'/>
        </button>
    )
}