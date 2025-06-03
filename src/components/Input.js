import styles from '../styles/input.module.css'

export function Input ({id, name, type, placeholder, icon, handleChange, styleType}) {

    return (
        <input 
            type={type}
            id={id} 
            name={name} 
            placeholder={placeholder} 
            onChange={handleChange}
            className={styleType === 'login' ? styles.inputlogin : styles.input}
        />
    )
}