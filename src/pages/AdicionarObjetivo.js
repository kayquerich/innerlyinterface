import { InternalPage as Page } from "../components/Container"
import { useState } from "react";
import styles from '../styles/AdicionarObjetivos.module.css'
import { Subtitle } from "../components/Text";
import { criar_objetivo } from "../services/Usuarios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

export default function AdicionarObjetivo() {

    const usuario = JSON.parse(sessionStorage.getItem("usuario"))

    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [prazo, setPrazo] = useState("");

    const navigation = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const novoObjetivo = {
            descricao,
            categoria,
            prazo,
        };

        const token = usuario.token;
        const data = await criar_objetivo(novoObjetivo, token);

        if (data.criado) {
            navigation('/objetivos');
        }

        console.log("Novo Objetivo:", novoObjetivo);

    };

    return (
        <Page dados={usuario} >
            <main className={styles.page_container} >
                <div className={styles.form_card} >
                    <div className={styles.form_header}>
                        <Subtitle>Adicionar Novo Objetivo</Subtitle>
                        <button className={styles.btn_voltar} onClick={() => navigation('/objetivos')}>
                            <Icon icon="arrow-left" />
                            Voltar
                        </button>
                    </div>
                    <p className={styles.subtitle} >
                        Defina um objetivo, escolha sua categoria e um prazo para alcançá-lo.
                    </p>
                    <form onSubmit={handleSubmit} className={styles.objetivo_form} >
                        <div className={styles.form_group} >
                            <label>Descrição</label>
                            <textarea
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Descreva seu objetivo..."
                                required
                            />
                        </div>
                        <div className={styles.form_group} >
                            <label>Categoria</label>
                            <select
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                required
                            >
                                <option value="">Selecione...</option>
                                <option value="Pessoal">Pessoal</option>
                                <option value="Profissional">Profissional</option>
                                <option value="Saúde">Saúde</option>
                                <option value="Financeiro">Financeiro</option>
                                <option value="Estudos">Estudos</option>
                            </select>
                        </div>
                        <div className={styles.form_group} >
                            <label>Prazo</label>
                            <input
                                type="date"
                                value={prazo}
                                onChange={(e) => setPrazo(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.btn_enviar} >
                            Salvar Objetivo
                        </button>
                    </form>
                </div>
            </main>
        </Page>
    )
}