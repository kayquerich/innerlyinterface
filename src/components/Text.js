import styles from '../styles/global.module.css'

export function Title ({text}) {
    return (
        <h1 className={styles.title}>{text}</h1>
    )
}

export function Subtitle({text}) {
    return (
        <h2 className={styles.subtitle}>{text}</h2>
    )
}

export function Separator() {
    return (
        <div className={styles.separator}></div>
    )
}