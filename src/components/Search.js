import { useState } from 'react'
import styles from '../styles/search.module.css'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export function SearchBar ({action, placeholder}) {

    const [string, setString] = useState('')

    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <Icon icon='search'/>
            </div>
            <input
                type='text'
                className={styles.search}
                placeholder={placeholder}
                onChange={(e) => setString(e.target.value)}
            />

            <button className={styles.button} onClick={() => action(string)} >
                Pesquisar
            </button>
        </div>
    )
}