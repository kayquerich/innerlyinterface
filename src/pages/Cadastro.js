import styles from '../styles/global.module.css'
import inputStyles from '../styles/input.module.css'
import onda from '../assets/onda-cut.png'
import { Input } from '../components/Input'

export default function Cadastro () {
    return (
        <div className={styles.pages}>
            <div className={styles.content} style={{alignItems : 'center', flexDirection : 'column'}}>
                <header style={{marginBottom : '1.5em'}}>
                    <h1 className={styles.title}>Innerly</h1>
                </header>
                <div className={inputStyles.cadastroform}>
                    
                    <p>Cadastre-se</p>

                    <Input
                        id='nome'
                        name='nome'
                        placeholder='Nome'
                        type='text'
                    />
                    <Input
                        id='email'
                        name='email'
                        placeholder='Email'
                        type='email'
                    />
                </div>
            </div>
            <img src={onda} alt="imagem de uma onda" className={styles.wave}/>
        </div>
    )
}