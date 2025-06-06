import styles from '../styles/button.module.css'

export function ButtonSubmit ({handleClick, text, typeStyle}) {
    return (
        <button onClick={handleClick} className={typeStyle === 'login' ? styles.buttonsubmitone : styles.buttonsubmittwo}>
            {text}
        </button>
    )
}

export function EditButton ({handleClick}) {
    return (
        <button onClick={handleClick} className={styles.buttonedit}>
            editar
        </button>
    )
}