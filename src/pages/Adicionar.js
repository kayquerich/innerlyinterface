import { useLocation, useNavigate } from "react-router-dom"
import { Clickable, VoltarPagina} from "../components/Button";
import { InternalPage as Page } from "../components/Container"
import { AnotationInput, EmotionInput } from '../components/Input';
import { Subtitle } from "../components/Text";
import { useEffect, useState } from "react";
import { createRegistro } from "../services/Usuarios";
import styles from '../styles/adicionar.module.css'
import { getCurrentDate, getAtivides } from "../services/Gadgets";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

export default function Adicionar () {

    const saved = sessionStorage.getItem('registros')
    const saved_registros = saved ? JSON.parse(saved) : []

    const navigation = useNavigate()

    const location = useLocation()
    const dados = location.state

    const [registro, setRegistro] = useState({
        data : getCurrentDate(),
        atividades : [],
    })

    const onEmotionChange = (e) => {
        setRegistro({...registro, 'value_humor' : e})
    }

    const onAnotationChange = (e) => {
        setRegistro({...registro, 'anotacao' : e.target.value})
    } 

    const onHandleSubmit = async () => {

        const response = await createRegistro(registro, dados.token)

        if (response && response.criado) {
            alert('Registro adicionado!')
            saved_registros.push(response.registro)
            sessionStorage.setItem('registros', JSON.stringify(saved_registros))
            navigation(-1, { state : { parse_usuario : dados } })
        } else {
            alert('Erro na criação do registro')
        }

    }

    const [atividades, setAtividades] = useState([])
    useEffect(() => {
        async function fetchAtividades() {
            const saved_atividades = await getAtivides()
            setAtividades(saved_atividades)
        }
        fetchAtividades()
    }, [])

    const selectAtividade = (id) => {
        if (registro.atividades.includes(id)) {
            const novas_atividades = registro.atividades.filter(item => item !== id)
            setRegistro({...registro, 'atividades' : novas_atividades})
        } else {
            setRegistro({...registro, 'atividades' : [...registro.atividades, id]})
        }
    }

    return (
        <Page dados={dados}>
            <div className={styles.container} >

                <header>
                    <VoltarPagina/>
                    <Subtitle>Adicionar registro</Subtitle>
                </header>

                <div className={styles.container_input} >
                    <Subtitle>Como está se sentindo?</Subtitle>
                    <EmotionInput handleChange={onEmotionChange}/>
                </div>

                <div className={styles.container_input} >
                    <Subtitle>O que você tem feito?</Subtitle>
                    <div className={styles.atividades_container} >
                        {atividades.length > 0 ? atividades.map((atividade) => (
                            <div 
                                key={atividade.id} 
                                className={styles.atividade_item}
                                onClick={() => selectAtividade(atividade.id)}
                            >
                                <span className={registro.atividades.includes(atividade.id) ? styles.atividade_icone_selected : styles.atividade_icone} >
                                    <Icon icon={atividade.icone} />
                                </span>
                                <span className={styles.atividade_nome} >{atividade.nome}</span>
                                {registro.atividades.includes(atividade.id) && <span className={styles.atividade_check} ><Icon icon="fa-solid fa-check" /></span>}
                            </div>
                        )) : <div>Carregando...</div>}
                    </div>
                </div>

                <div className={styles.container_input} >
                    <Subtitle>Anotações</Subtitle>
                    <AnotationInput handleChange={onAnotationChange}/>
                </div>

                <div className={styles.container_button} >
                    <Clickable action={onHandleSubmit} color='var(--blue-green)' >
                        Adicionar
                    </Clickable>
                </div>

            </div>
        </Page>
    )
}