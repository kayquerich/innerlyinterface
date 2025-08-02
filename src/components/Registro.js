import styles from '../styles/registros.module.css'
import { listaEmojis } from '../assets/dados'
import { useNavigate } from 'react-router-dom'
import { Line } from './Text'

export function Registro ({registro, dados}){

    const navigation = useNavigate()

    const goToPage = () => {
        if (dados && 'credencial' in dados) {
            navigation('/profissional/registro/detalhes', { state : {
                registro : registro,
                dados : dados
            } })
        } else {
            navigation('/registros/detalhes', { state : {
                registro : registro,
                usuario : dados
            } })
        }
    }

    return (
        <div className={styles.registro} onClick={goToPage}>

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