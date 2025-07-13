import styles from '../styles/search.module.css'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export function SearchBar ({action, placeholder, options, icon}) {

    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <Icon icon='search'/>
            </div>
            <input
                type='text'
                className={styles.search}
                placeholder='Busque profissionais da area da saude mental...'
            />

            <button className={styles.button}>
                Pesquisar
            </button>
        </div>
    )
}