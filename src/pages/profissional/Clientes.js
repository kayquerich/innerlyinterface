import styles from '../../styles/styles-profissional/clientes.module.css'
import { InternalPage as Page } from "../../components/Container"
import { Separator, Subtitle } from "../../components/Text"
import { ClientPreview } from "../../components/Card"
import { useEffect, useState } from 'react'
import { listarClientes, listarRegistrosCliente } from '../../services/Profissionais'
import { Registro } from '../../components/Registro'

export default function Clientes () {

    const profissional = JSON.parse(sessionStorage.getItem('profissional'))

    const [clientes, setClientes] = useState([]) 
    const [registros, setRegistros] = useState([])

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

    }, [])

    const buscarRegistros = async (id) => {
        const response = await listarRegistrosCliente(profissional.token, id)
        sessionStorage.setItem('temporary', JSON.stringify(response))
        setRegistros(response)
    }

    return (
        <Page dados={profissional} style={{ display : 'flex' }} >  

            <div className={styles.container_clientes} >
                <Subtitle>Clientes</Subtitle>
                <Separator margin={20} />

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

            <div className={styles.container_registros} >
                <Subtitle>Registros</Subtitle>

                {!registros.length && (
                    <div className={styles.void_container} >
                        <p>Clique em um dos clientes para apresentar seus registros</p>
                    </div>
                )}

                {registros.length && (
                    <div className={styles.lista_registros} >
                        {registros.map((item, index) => (
                            <Registro dados={profissional} registro={item} key={index} />
                        ))}
                    </div>
                )}

            </div>

        </Page>
    )

}