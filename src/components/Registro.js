import styles from '../styles/registros.module.css'

export function Registro ({registro}){

    const listaEmojis = [
        require('../assets/images/emojis/muito-mal.png'), 
        require('../assets/images/emojis/mal.png'), 
        require('../assets/images/emojis/mais-ou-menos.png'), 
        require('../assets/images/emojis/bem.png'), 
        require('../assets/images/emojis/muito-bem.png')
    ]

    return (
        <div className={styles.registro}>
            <header className={styles.header}>
                <p>{registro.title}</p>
            </header>
            <div className={styles.description}>
                <p style={{textAlign : 'justify'}}>{registro.description}</p>
            </div>
            <footer className={styles.footer}>
                <img 
                    src={listaEmojis[registro.valuehumor]} 
                    alt={'emoji' + listaEmojis[registro.valuehumor]} 
                    className={styles.emoji}
                />
            </footer>
        </div>
    )
}