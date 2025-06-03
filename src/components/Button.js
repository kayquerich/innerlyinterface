import styles from '../styles/button.module.css'

export function ButtonSubmit ({handleClick, text}) {
    return (
        <button onClick={handleClick} className={styles.buttonsubmitone}>
            {text}
        </button>
    )
}