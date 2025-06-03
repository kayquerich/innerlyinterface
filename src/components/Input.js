import styles from '../styles/input.module.css'

export function Input ({id, name, type, placeholder, icon, handleChange}) {

    return (
        <input 
            type={type}
            id={id} 
            name={name} 
            placeholder={placeholder} 
            onChange={handleChange}
            className={styles.inputlogin}
        />
    )
}