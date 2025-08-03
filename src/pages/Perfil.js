import { InternalPage as Page } from "../components/Container"
import { Subtitle } from "../components/Text"
import { ModalModular } from "../components/Modal"
import styles from '../styles/perfil.module.css'
import { useState } from "react"
import { UserHeader as Header } from "../components/Header"
import { DataPainel } from "../components/DataPainel"
import { updateUsuario } from "../services/Usuarios"
import { Input, TextInput, RadioInput } from "../components/Input"
import { Clickable } from "../components/Button"

export default function Perfil () {

    const usuario = JSON.parse(sessionStorage.getItem('usuario'))
    const [openModal, setOpenModal] = useState(false)

    const [DTOusuario, setDTOusuario] = useState({
        nome : usuario.nome,
        contato : usuario.contato,
        biografia : usuario.biografia,
        genero : usuario.genero
    })

    const handleChange = (event) => {
        setDTOusuario({...DTOusuario, [event.target.name] : event.target.value})
    }

    const genderChange = (e) => {
        setDTOusuario({...DTOusuario, 'genero' : e})
    }

    const alterarUsuario = async () => {

        const response = await updateUsuario(DTOusuario, usuario.token)
        if (response) setOpenModal(false);

    }

    return (
        <>

            {openModal && (
                <ModalModular
                    close={() => setOpenModal(false)}
                    title='Alterar Informações'
                >
                    <div className={styles.formulario_edicao} >
                            
                        <div className={styles.line} >
                            <Input
                                id='nome'
                                name='nome'
                                value={DTOusuario.nome}
                                styleType='edit'
                                placeholder='Seu nome...'
                                handleChange={handleChange}
                            />
                        </div>
                        <div className={styles.line} >
                            <Input
                                id='contato'
                                name='contato'
                                value={DTOusuario.contato}
                                styleType='edit'
                                placeholder='Seu contato...'
                                handleChange={handleChange}
                            />
                        </div>
                        <div className={styles.line} >
                            <RadioInput
                                title='Gênero'
                                options={['masculino', 'feminino', 'outro']}
                                handleChange={genderChange}
                                checked_value={DTOusuario.genero}
                                initial_value={DTOusuario.genero}
                            />
                        </div>
                        <div className={styles.line} >
                            <p>Biografia</p>
                            <TextInput
                                name='biografia'
                                placeholder='Escreva um pouco sobre você...'
                                value={DTOusuario.biografia}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <footer>
                            <Clickable color='var(--title-blue)' action={alterarUsuario}>
                                Alterar
                            </Clickable>
                        </footer>

                    </div>
                </ModalModular>
            )}

            <Page dados={usuario} >

                <Subtitle>Meu Perfil</Subtitle>

                <Header dados={usuario} />
                <DataPainel 
                    dados={usuario}
                    execute={() => setOpenModal(true)}
                />

            </Page>
        </>
    )
}
