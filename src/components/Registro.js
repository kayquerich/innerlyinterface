import styles from '../styles/registros.module.css'
import { listaEmojis } from '../assets/dados'
import { useNavigate } from 'react-router-dom'
import { Line } from './Text'

export function Registro ({registro, dados}){

    const navigation = useNavigate()

    const goToPage = (usuario) => {
        if (usuario && 'concelho' in usuario) {
            navigation('/profissional/registro/detalhes', { state : {
                registro : registro,
                dados : usuario
            } })
        } else {
            navigation('/registros/detalhes', { state : {
                registro : registro,
                usuario : usuario
            } })
        }
    }

    return (
        <div className={styles.registro} onClick={() => goToPage(dados)}>

            <p>{registro.title}</p>
            <Line color='black' />
            <p>{registro.anotacao.substring(0,150) + '...'}</p>

            <img 
                src={listaEmojis[registro.value_humor]} 
                alt="imagem de um emoji equivalente a emoção"   
            />


        </div>
    )
}