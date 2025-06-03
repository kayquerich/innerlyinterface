import styles from '../styles/button.module.css'

export function ButtonSubmit ({handleClick, text, typeStyle}) {
    return (
        <button onClick={handleClick} className={typeStyle === 'login' ? styles.buttonsubmitone : styles.buttonsubmittwo}>
            {text}
        </button>
    )
}