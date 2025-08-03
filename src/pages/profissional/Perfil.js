import { useState } from "react";
import { InternalPage as Page } from "../../components/Container";
import { DataPainel } from "../../components/DataPainel";
import { ProfissionalHeader as Header} from "../../components/Header";
import { PainelTitle, Subtitle, Line } from "../../components/Text";
import styles from '../../styles/perfil.module.css'
import { ModalModular } from "../../components/Modal";
import { Input, RadioInput, TextInput } from "../../components/Input";
import { Clickable } from "../../components/Button";
import { updateProfissional } from "../../services/Profissionais";

export default function PerfilProfissional () {

    const profissional = JSON.parse(sessionStorage.getItem('profissional'))
    const [openModal, setOpen] = useState(false)

    const [DTOprofissional, setDTOprofissional] = useState({
        nome : profissional.nome,
        contato : profissional.contato,
        biografia : profissional.biografia,
        genero : profissional.genero
    })

    const handleChange = (event) => {
        setDTOprofissional({...DTOprofissional, [event.target.name] : event.target.value})
    }

    const genderChange = (e) => {
        setDTOprofissional({...DTOprofissional, 'genero' : e})
    }

    const alterarProfissional = async () => {

        const response = await updateProfissional(profissional.token, DTOprofissional)
        if (response) setOpen(false);

    }

    return (
        <>

            {openModal && (
                <ModalModular 
                    close={() => setOpen(false)}
                    title='Editar Informações'
                >
                    <div className={styles.formulario_edicao} >
                            
                        <div className={styles.line} >
                            <Input
                                id='nome'
                                name='nome'
                                value={DTOprofissional.nome}
                                styleType='edit'
                                placeholder='Seu nome...'
                                handleChange={handleChange}
                            />
                        </div>
                        <div className={styles.line} >
                            <Input
                                id='contato'
                                name='contato'
                                value={DTOprofissional.contato}
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
                                checked_value={DTOprofissional.genero}
                                initial_value={DTOprofissional.genero}
                            />
                        </div>
                        <div className={styles.line} >
                            <p>Biografia</p>
                            <TextInput
                                name='biografia'
                                placeholder='Escreva um pouco sobre você...'
                                value={DTOprofissional.biografia}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <footer>
                            <Clickable color='var(--title-blue)' action={alterarProfissional}>
                                Alterar
                            </Clickable>
                        </footer>

                    </div>
                </ModalModular>
            )}

            <Page dados={profissional}>

                <Subtitle>Meu Perfil</Subtitle>
                
                <Header dados={profissional} />
                <DataPainel 
                    dados={profissional} 
                    execute={() => setOpen(true)}
                />

                {(profissional && 'credencial' in profissional) && (
                    <div className={styles.painel_especialidades} >
                        <PainelTitle>Areas de especialidade</PainelTitle>
                        <Line/>
                        <div style={{ display : 'flex', gap : 10 }} >
                            <div className={styles.especialidade} >Especialidade</div>
                            <div className={styles.especialidade} >Em desenvolvimento</div>
                            <div className={styles.especialidade} >Especialidade</div>
                        </div>
                    </div>
                )}

            </Page>

        </>
    )
}