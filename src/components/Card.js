import { useNavigate } from 'react-router-dom'
import picture from '../assets/images/perfil-static-icon.png'
import styles from '../styles/card.module.css'
import { PainelTitle, Separator } from './Text'
import { dateString, setColorBoolean } from '../services/Gadgets'

function ActiveTag ({boolean}) {
    return (
        <div className={boolean ? styles.tag_active : styles.tag_not_active}>
            {boolean ? 'ativa' : 'não-ativa'}
        </div>
    )
}

export function FollowPreview ({dados}) {

    const navigation = useNavigate()

    const HandleClick = () => {
        navigation('/acompanhamento', { state : dados })
    }

    return (
        <div className={styles.card_follow} onClick={HandleClick} >

            <header className={styles.follow_header} >
                <img src={picture} alt="imagem estatica de perfil" className={styles.follow_image} />

                <div>
                    <p className={styles.user_name} >{dados.nome_profissional}</p>
                    <p className={styles.follow_info} >Codigo de relação : {dados.codigo_acompanhamento}</p>
                </div>
            </header>

            <div className={styles.follow_body}>
                <p>Data de inicio : {dados.data_inicio}</p>
            </div>

            <ActiveTag boolean={dados.is_ativo} />

        </div>
    )
}

export function ProfessionalOption ({dados}) {

    const navigation = useNavigate()

    const HandleClick = () => {
        const lista = JSON.parse(sessionStorage.getItem('recentes')) || []
        
        const jaExiste = lista.some(item => item.codigo_acompanhamento === dados.codigo_acompanhamento)
        if (!jaExiste) {
            lista.push(dados)
            sessionStorage.setItem('recentes', JSON.stringify(lista))
        }

        navigation('/solicitacao', { state : dados })
    }

    return (
        <div className={styles.profissional_tag} onClick={HandleClick} >
            <img src={picture} alt="imagem estática de perfil" />
            <div style={{ height : '100%', paddingBlock : 10, marginLeft : 10 }} >
                <PainelTitle>{dados.nome}</PainelTitle>
                <div>
                    <p style={{ color : 'gray' }} >Codigo</p>
                    <p>{dados.codigo_acompanhamento}</p>
                </div>
                <p>{dados.biografia.substring(0, 52) + '...'}</p>
            </div>
        </div>
    )
}

export function Notification ({dados}) {

    const navigation = useNavigate()

    const handleClick = () => {
        navigation('/profissional/solicitacao', { state : dados })
    }

    return (
        <div className={styles.notification} onClick={handleClick} >
            <img src={picture} alt="imagem estática de perfil" />
            <div>
                <p>{dados.dados_usuario.nome} te enviou uma solicitação, veja mais...</p>
            </div>
        </div>
    )
}

export function UsuarioCard ({dados}) {
    return (
        <div className={styles.usuario_tag} >
            <img src={picture} alt="imagem estática de perfil" />
            <div className={styles.text_user_card} >
                <p className={styles.user_name} >{dados.nome}</p>
                <p>{dados.biografia}</p>
                <div className={styles.naosei} >
                    <div>
                        <p style={{ color : 'gray' }} >Contato</p>
                        <p>{dados.contato}</p>
                    </div>
                    <div>
                        <p style={{ color : 'gray' }} >Gênero</p>
                        <p>{dados.genero}</p>
                    </div>
                    <div>
                        <p style={{ color : 'gray' }} >Data de nascimento</p>
                        <p>{dados.nascimento}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function FollowCard ({dados}) {
    return (
        <div className={styles.follow} >
            <img src={picture} alt="imagem estática de perfil" />
            
            <div className={styles.follow_text} >
                <PainelTitle>{dados.nome_profissional}</PainelTitle>
                <p className={styles.opacity} >Código de acompanhamento : {dados.codigo_acompanhamento}</p>
                <p>{dados.biografia}</p>
                <div>
                    <p className={styles.opacity} >Data de inicio</p>
                    <p>{dateString(dados.data_inicio)}</p>
                </div>
            </div>

            <div className={styles.status} style={setColorBoolean(dados.is_ativo)} >
                {dados.is_ativo ? "Acompanhamento Ativo" : "Acompanhamento Encerrado"}
            </div>

        </div>
    )
}

export function ProfessionalFollow ({dados}) {
    return (
        <div className={styles.follow} >
            <img src={picture} alt="imagem estática de perfil" />
            <div className={styles.follow_text} >
                <PainelTitle>{dados.nome}</PainelTitle>
                <p>{dados.biografia}</p>
                <p>Contato: {dados.contato}</p>
                <p className={styles.opacity} >Código de acompanhamento</p>
                <p>{dados.codigo_acompanhamento}</p>
            </div>
        </div>
    )
}

export function ClientPreview ({dados, execute}) {

    const handleClick = () => {
        execute && execute()
    }

    return (
        <div className={styles.client_preview} onClick={handleClick} >
            <img src={picture} alt="imagem estática de perfil" />
            <div className={styles.preview_text} >
                <PainelTitle>{dados.user_data.nome}</PainelTitle>
                <p style={{ color : 'gray' }} >Data Inicio</p>
                <p>{dateString(dados.data_inicio)}</p>
            </div>   
            <div className={styles.circle} title='verde/ativo | vermelho/não ativo' ></div>
        </div>
    )

}