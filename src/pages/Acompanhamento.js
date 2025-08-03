import { useLocation } from "react-router-dom"
import { InternalPage as Page } from "../components/Container"
import { Subtitle } from "../components/Text"
import { ModalModular } from "../components/Modal"
import styles from '../styles/acompanhamento.module.css'
import { useState } from "react"
import { Clickable, VoltarPagina } from "../components/Button"
import { FollowCard } from "../components/Card"
import { encerrarAcompanhamento, listarAcompanhamentos } from "../services/Usuarios"

export default function Acompanhamento () {
    
    const location = useLocation()

    const usuario = JSON.parse(sessionStorage.getItem('usuario'))
    const [follow, setFollow] = useState(location.state)

    const [showModal, setShowModal] = useState(false)

    const atualizarStatus = () => {
        setFollow({...follow, is_ativo : false})
    }

    const handleClick = async () => {
        const is_closed = await encerrarAcompanhamento(follow.id, usuario.token)

        if (is_closed) {
            const query_follows = await listarAcompanhamentos(usuario.token)
            sessionStorage.setItem('acompanhamentos', JSON.stringify(query_follows))
        }

        atualizarStatus()
        setShowModal(false)
    }

    return (
        <>

            {showModal && (
                <ModalModular close={() => setShowModal(false)} 
                    title='Deseja Realmente Encerrar o Acompanhamento ?'
                >

                    <p className={styles.linha_texto} >Deseja realmente encerrar o acompanhamento? Após isso o profissional será removido da sua lista de acompanhantes e caso queira ser acompanhado pelo mesmo, terá que solicitar novamente.</p>

                    <div className={styles.button_space} >
                        <Clickable color='var(--button-red)' action={handleClick} >
                            Encerrar mesmo assim
                        </Clickable>
                    </div>

                </ModalModular>
            )}

            <Page dados={usuario} style={{ position : 'relative' }}>

                <header style={{ display : 'flex', gap : 20 }} >
                    <VoltarPagina/>
                    <Subtitle>Acompanhamento</Subtitle>
                </header>

                <FollowCard dados={follow} />

                <div className={styles.footer} >
                    {follow.is_ativo && (
                        <Clickable action={() => setShowModal(true)} color='var(--button-red)' >
                            Encerrar Acompanhamento
                        </Clickable>
                    )}
                </div>

            </Page>

        </>
    )
}