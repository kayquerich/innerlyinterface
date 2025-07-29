import styles from '../styles/modal.module.css'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { RadioInput, Input } from './Input'
import { useState } from 'react'
import { encerrarAcompanhamento, updateUsuario, listarAcompanhamentos, solicitarAcompanhamento } from '../services/Usuarios'
import { Clickable } from './Button'
import { responderSolicitacao } from '../services/Profissionais'
import { useNavigate } from 'react-router-dom'

export function UserEditPage ({close}) {

    const saved_usuario = JSON.parse(sessionStorage.getItem('usuario'))
    const [dados, setDados] = useState({
        'nome' : saved_usuario.nome,
        'contato' : saved_usuario.contato,
        'genero' : saved_usuario.genero,
        'biografia' : saved_usuario.biografia
    })

    const onHandleChange = (e) => {
        setDados({...dados, [e.target.name] : e.target.value})
    }

    const onHandleSubmit = async () => {
        
        const response = await updateUsuario(dados, saved_usuario.token)

        if (response) {
            close()
        }

    }

    const onGenderChange = (e) => {
        setDados({...dados, 'genero' : e})
    }

    return (
        <div className={styles.page} >

            <div className={styles.editcontainer} >

                <h3 className={styles.title} >Alterar informações pessoais</h3>
                <hr style={{ border: '1px solid #ccc', margin: '10px 0' }}/>

                <div className={styles.container}>

                    <div className={styles.containerinput}>
                        <p>Nome</p>
                        <Input id='nome' name='nome' value={dados.nome} styleType='edit' handleChange={onHandleChange} placeholder='Seu nome...'/>
                    </div>
                    <div className={styles.containerinput}>
                        <p>Contato</p>
                        <Input id='contato' name='contato' value={dados.contato} styleType='edit' handleChange={onHandleChange} placeholder='Seu Contato...'/>
                    </div>

                    <div style={{width : '350px'}}>
                        <RadioInput 
                            handleChange={onGenderChange}
                            options={['masculino', 'feminino', 'outro']}
                            title='Gênero'
                            checked_value={dados.genero}
                            initial_value={dados.genero}
                        />
                    </div>

                    <div className={styles.containerinput}>
                        <p>Biografia</p>
                        <textarea
                            placeholder='Escreva um pouco sobre você...'
                            className={styles.textarea}
                            name='biografia'
                            onChange={onHandleChange}
                        >
                            {dados.biografia}
                        </textarea>
                    </div>

                </div>

                <button onClick={onHandleSubmit} className={styles.submit}>
                    Alterar
                </button>

            </div>

            <button className={styles.close} onClick={close}>
                <Icon icon='xmark'/>
            </button>
        </div>
    )
}

export function ConfirmClose ({close, id, token, execute}) {

    const handleClick = async () => {
        const is_closed = await encerrarAcompanhamento(id, token)

        if (is_closed) {
            const query_follows = await listarAcompanhamentos(token)
            sessionStorage.setItem('acompanhamentos', JSON.stringify(query_follows))
        }

        execute()
        close()
    }

    return (
        <div className={styles.page} >
            <div style={container} >
                <h3 className={styles.title} >Confirme que deseja encerrar o acompanhamento</h3>
                <hr style={{ border: '1px solid #ccc', margin: '10px 0' }}/>
                <div>
                    <p style={{ textAlign : 'justify' }} >
                        Deseja realmente encerrar o acompanhamento, após isso o profissional será removido da sua lista de acompanhantes e caso queira ser acompanhado pelo mesmo, terá que solicitar novamente.
                    </p>
                </div>
                <footer style={footer} >
                    <button onClick={close && close} className={styles.back} >Voltar</button>
                    <button className={styles.encerrar} onClick={handleClick} >Encerrar mesmo assim</button>
                </footer>
            </div>
        </div>
    )
}

const container = {
    height : 200,
    width : '80%',
    backgroundColor : 'white',
    padding : 20,
    position : 'relative'
}

const footer = {
    position : 'absolute',
    bottom : 20,
    right : 20,
    display : 'flex',
    gap : 15
}

export function FinalizarSolicitacao ({close, token, execute, dados}) {

    const [message, setMessage] = useState('')

    const finalizar = async () => {
        const response = await solicitarAcompanhamento(token, dados.codigo_acompanhamento, (message || 'gostaria que acomapanhasse meus registros!'))
        execute(response.solicitacao)
        close()
    }

    return (
        <div className={styles.page} >
            <div style={formulario} >
                <h3 className={styles.title} >Finalizar solicitação</h3>
                <hr style={{ border: '1px solid #ccc', margin: '10px 0' }}/>

                <p>Você está enviando uma solicitação de acomapanhamento para {dados.nome} deixe aqui uma mensagem pra que ele entenda o motivo da solicitação</p>

                <textarea 
                    placeholder='escreva uma mensagem aqui...' 
                    onChange={(e) => setMessage(e.target.value)}
                    className={styles.textarea}    
                    required
                >

                </textarea>

                <footer style={footer} >
                    <button onClick={close && close} className={styles.back} >Voltar</button>
                    <button onClick={finalizar} className={styles.finally} >Finalizar Solicitação</button>
                </footer>
            </div>
        </div>
    )
}

const formulario = {
    width : 500,
    height : '80%',
    backgroundColor : 'white', 
    padding : 20,
    position : 'relative'
}

export function RecusarSolicitacao ({token, id, close}) {

    const solicitacoes = JSON.parse(sessionStorage.getItem('solicitacoes'))

    const navigation = useNavigate()

    const recusarSolicitacao = async () => {

        await responderSolicitacao(token, id, 'recusada')

        const dados = solicitacoes.filter(item => item.id !== id)
        sessionStorage.setItem('solicitacoes', JSON.stringify(dados))

        alert('Solicitação recusada')
        navigation('/profissional/home')
        
    }

    return (
        <div className={styles.page} >
            <div style={container} >
                <h3 className={styles.title} >Recusar solicitação</h3>
                <hr style={{ border: '1px solid #ccc', margin: '10px 0' }}/>
                <p>tem certeza que quer recusar a solitação?</p>
                <footer style={footer} >
                    <Clickable color='#383897' action={close && close} >
                        Voltar
                    </Clickable>
                    <Clickable color='#a90000' action={recusarSolicitacao}>
                        Recusar
                    </Clickable>
                </footer>
            </div>
        </div>
    )
}