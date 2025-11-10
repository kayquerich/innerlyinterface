import { InternalPage as Page } from "../components/Container";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styles from '../styles/VizualizarObjetivo.module.css'
import { Subtitle } from "../components/Text";
import { atualizar_objetivo, cadastrar_resultado_objetivo } from "../services/Usuarios";

export default function VizualizarObjetivo() {

    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    const location = useLocation();
    const { objetivo } = location.state;

    const navigate = useNavigate();

    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [prazo, setPrazo] = useState("");
    const [resultados, setResultados] = useState([]);
    const [novoResultado, setNovoResultado] = useState("");
    const [concluido, setConcluido] = useState(false);
    const [progresso, setProgresso] = useState(0);

    // Simula busca do objetivo no backend
    useEffect(() => {
        const objetivos = JSON.parse(sessionStorage.getItem("objetivos")) || [];
        const obj = objetivos.find((o) => o.id === parseInt(objetivo.id));
        if (obj) {
            setDescricao(obj.descricao);
            setCategoria(obj.categoria);
            setPrazo(obj.prazo);
            setResultados(obj.resultados || []);
            setConcluido(obj.concluido || false);
            setProgresso(obj.progresso || 0);
        }
    }, [objetivo.id]);

    const handleAddResultado = async () => {
        if (novoResultado.trim() === "") return;
        
        // Enviar o novo resultado para o backend
        const dados = {
            id_objetivo: objetivo.id,
            descricao : novoResultado
        };

        const response = await cadastrar_resultado_objetivo(dados, usuario.token);

        if (response && response.adicionado) {
            // Atualizar a lista de resultados localmente com o objeto retornado do backend
            const novoResultadoObj = {
                id: response.id,
                descricao: novoResultado,
                data_criacao: new Date().toISOString()
            };
            const atualizados = [...resultados, novoResultadoObj];
            setResultados(atualizados);
            setNovoResultado("");
        } else {
            alert("Erro ao adicionar resultado. Tente novamente.");
        }
    };

    // Ao marcar concluído, atualiza o estado de concluido e força progresso para 100
    const handleConcluidoChange = (checked) => {
        setConcluido(checked);
        if (checked) setProgresso(100);
    };

    const handleSalvar = async () => {

        // enviar todos os campos relevantes ao backend (inclui resultados e progresso)
        const dados = {
            id: objetivo.id,
            descricao: descricao,
            categoria: categoria,
            prazo: prazo,
            resultados: resultados,
            concluido: concluido,
            progresso: progresso,
        };

        const data = await atualizar_objetivo(dados, usuario.token);

        if (data && data.sucesso) {
            // garantir que o sessionStorage local esteja sincronizado imediatamente
            const objetivos = JSON.parse(sessionStorage.getItem("objetivos")) || [];
            const atualizados = objetivos.map((o) =>
                o.id === parseInt(objetivo.id)
                    ? { ...o, descricao, categoria, prazo, resultados, concluido, progresso }
                    : o
            );
            sessionStorage.setItem("objetivos", JSON.stringify(atualizados));

            alert("Objetivo atualizado com sucesso!");
        } else {
            alert("Erro ao atualizar objetivo. Tente novamente.");
        }
    };


    return (
        <Page dados={usuario} >

            <div className={styles.view_container}>
                <div className={styles.view_card}>
                    <header className={styles.view_header}>
                        <Subtitle>
                            <Icon icon="bullseye" /> Detalhes do Objetivo
                        </Subtitle>
                        <button className={styles.btn_voltar} onClick={() => navigate("/objetivos")}>
                            <Icon icon="arrow-left" /> Voltar
                        </button>
                    </header>

                    <div className={styles.view_content}>
                        <section className={styles.info_section}>
                            <h3>Informações Gerais</h3>

                            <div className={styles.form_group}>
                                <label>Descrição</label>
                                <textarea
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
                            </div>

                            <div className={styles.form_group}>
                                <label>Categoria</label>
                                <select
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                >
                                    <option value="Pessoal">Pessoal</option>
                                    <option value="Profissional">Profissional</option>
                                    <option value="Saúde">Saúde</option>
                                    <option value="Financeiro">Financeiro</option>
                                    <option value="Estudos">Estudos</option>
                                </select>
                            </div>

                            <div className={styles.form_group}>
                                <label>Prazo</label>
                                <input
                                    type="date"
                                    value={prazo}
                                    onChange={(e) => setPrazo(e.target.value)}
                                />
                            </div>

                            <div className={styles.form_group}>
                                <label className={styles.checkbox_label}>
                                    <input
                                        type="checkbox"
                                        checked={concluido}
                                        onChange={(e) => handleConcluidoChange(e.target.checked)}
                                    />
                                    Marcar como concluído
                                </label>
                            </div>

                            <ProgressBar
                                value={progresso}
                                onChange={setProgresso}
                                editable={!concluido}
                            />
                        </section>

                        <section className={styles.resultados_section}>
                            <h3>Resultados Alcançados</h3>

                            <ul className={styles.resultados_lista}>
                                {resultados.map((r, index) => (
                                    <li key={index}>
                                        <Icon icon="check-circle" className={styles.check_icon} />
                                        {typeof r === 'string' ? r : r.descricao}
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.adicionar_resultado}>
                                <input
                                    type="text"
                                    placeholder="Descreva um novo resultado..."
                                    value={novoResultado}
                                    onChange={(e) => setNovoResultado(e.target.value)}
                                />
                                <button onClick={handleAddResultado}>Adicionar</button>
                            </div>
                        </section>
                    </div>

                    <footer className={styles.view_footer}>
                        <button className={styles.btn_salvar} onClick={handleSalvar}>
                            <Icon icon="floppy-disk" /> Salvar Alterações
                        </button>
                    </footer>
                </div>
            </div>

        </Page>
    )
}

function ProgressBar({ value = 0, onChange, editable = false }) {
    const [progress, setProgress] = useState(value);
    const barRef = useRef(null);

    // Sincroniza o estado interno sempre que a prop `value` mudar
    useEffect(() => {
        // garante que o componente reflita alterações vindas do pai
        setProgress(typeof value === 'number' ? value : 0);
    }, [value]);

    const handleClick = (e) => {
        if (!editable || !barRef.current) return;

        const rect = barRef.current.getBoundingClientRect();
        const newProgress = Math.round(
            ((e.clientX - rect.left) / rect.width) * 100
        );
        const clamped = Math.min(Math.max(newProgress, 0), 100);

        updateProgress(clamped);
    };

    const updateProgress = (newValue) => {
        const clamped = Math.min(Math.max(newValue, 0), 100);
        setProgress(clamped);
        if (onChange) onChange(clamped);
    };

    const handleIncrement = () => {
        if (!editable) return;
        updateProgress(progress + 5);
    };

    const handleDecrement = () => {
        if (!editable) return;
        updateProgress(progress - 5);
    };

    return (
        <div className={styles.progressBarWrapper}>
            <label className={styles.progressLabel}>Progresso</label>
            <div className={styles.progressControls}>
                {editable && (
                    <button
                        className={styles.progressButton}
                        onClick={handleDecrement}
                        disabled={progress <= 0}
                    >
                        <Icon icon="minus" />
                    </button>
                )}

                <div
                    className={`${styles.progressBarContainer} ${editable ? styles.editable : ""
                        }`}
                    ref={barRef}
                    onClick={handleClick}
                >
                    <div
                        className={styles.progressBarFill}
                        style={{ width: `${progress}%` }}
                    >
                        <span className={styles.progressBarText}>{progress}%</span>
                    </div>
                </div>

                {editable && (
                    <button
                        className={styles.progressButton}
                        onClick={handleIncrement}
                        disabled={progress >= 100}
                    >
                        <Icon icon="plus" />
                    </button>
                )}
            </div>
        </div>
    );
}