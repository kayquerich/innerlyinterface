import styles from '../../styles/styles-profissional/clientes.module.css'
import { InternalPage as Page } from "../../components/Container"
import { Subtitle } from "../../components/Text"
import { ClientPreview } from "../../components/Card"
import { useEffect, useState } from 'react'
import { listarClientes, listarRegistrosCliente } from '../../services/Profissionais'
import { Registro } from '../../components/Registro'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export default function Clientes () {

    const profissional = JSON.parse(sessionStorage.getItem('profissional'))

    const [clientes, setClientes] = useState([]) 
    const [registros, setRegistros] = useState([])
    const [largura, setLargura] = useState(window.innerWidth)

    useEffect(() => {

        const fetchClientes = async () => {

            const saved_clientes = JSON.parse(sessionStorage.getItem('clientes'))

            if (saved_clientes) {
                setClientes(saved_clientes)
            } else {
                const response = await listarClientes(profissional.token)
                setClientes(response)
                sessionStorage.setItem('clientes', JSON.stringify(response))
            }

        }
        fetchClientes()

        const preencherEstado = () => {
            const saved = sessionStorage.getItem('temporary')
            if (saved) setRegistros(JSON.parse(saved))
        }
        preencherEstado()

        const handleResize = () => setLargura(window.innerWidth)
        window.addEventListener('resize', handleResize) 
        return () => window.removeEventListener('resize', handleResize)

    }, [])

    const [client_view, setClient_View] = useState(true)
    const clientClick = () => {
        setClient_View(!client_view)
    }

    const buscarRegistros = async (id) => {
        const response = await listarRegistrosCliente(profissional.token, id)
        sessionStorage.setItem('temporary', JSON.stringify(response))
        setRegistros(response)
        clientClick()
    }

    return (
        <Page dados={profissional} style={{ display : 'flex' }} >  
            <div className={styles.page} >

                <div className={styles.container_clientes} style={(!client_view && largura < 940) ? {display : 'none'} : {}} >
                    <Subtitle>Clientes</Subtitle>

                    <div className={styles.lista_clientes} >
                        {clientes.map((item, index) => (
                            item.is_ativo && <ClientPreview 
                                dados={item} 
                                key={index}
                                execute={() => buscarRegistros(item.id)} 
                            />
                        ))}
                    </div>

                </div>

                <div className={styles.container_registros} style={(client_view && largura < 940) ? {display : 'none'} : {}}>
                    <Subtitle>Registros</Subtitle>

                    {!registros.length && (
                        <div className={styles.void_container} >
                            <p>Clique em um dos clientes para apresentar seus registros</p>
                        </div>
                    )}

                    {registros.length !== 0 && (
                        <div className={styles.lista_registros} >
                            {registros.map((item, index) => (
                                <Registro dados={profissional} registro={item} key={index} />
                            ))}
                        </div>
                    )}

                </div>

                {(!client_view && largura < 940) && (
                    <div className={styles.back_button} onClick={clientClick} >
                        <Icon icon="chevron-left" />
                    </div>
                )}

            </div>
        </Page>
    )

}