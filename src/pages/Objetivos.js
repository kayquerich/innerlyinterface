import { useEffect, useState } from "react";
import { InternalPage as Page } from "../components/Container";
import { listar_objetivos } from "../services/Usuarios";
import { Subtitle } from "../components/Text";
import styles from '../styles/objetivos.module.css'
import { Clickable } from "../components/Button";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { dateString } from "../services/Gadgets";
import { useNavigate } from "react-router-dom";

export default function Objetivos() {
    
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    const [objetivos, set_objetivos] = useState([])
    const [search, setSearch] = useState("");
    const [categoria, setCategoria] = useState("");
    const [data, setData] = useState("");

    useEffect(() => {

        async function fetch_objetivos () {

            const saved_objetivos = JSON.parse(sessionStorage.getItem('objetivos'))

            if (!saved_objetivos) {
                const query_objetivos = await listar_objetivos(usuario.token)
                set_objetivos(query_objetivos)
                sessionStorage.setItem('objetivos', JSON.stringify(query_objetivos))
            } else {
                set_objetivos(saved_objetivos)
            }

        }

        fetch_objetivos()

    }, [])

    const navigation = useNavigate()
    const redirect_add = () => {
        navigation('/objetivos/adicionar')
    }

    const objetivos_filtrados = objetivos.filter((obj) => {
        const matchSearch = obj.descricao.toLowerCase().includes(search.toLowerCase());
        const matchCategoria = categoria ? obj.categoria === categoria : true;
        const matchData = data ? obj.data_criacao.startsWith(data) : true;
        return matchSearch && matchCategoria && matchData;
    });

    const goToDetails = (objetivo) => {
        navigation('/objetivos/detalhes', { state: { objetivo } });
    }

    
    return (
        <Page dados={usuario} >

            <header className={styles.header} >
                <Subtitle>Objetivos</Subtitle>
                <Clickable color={'var(--text-green)'} action={redirect_add} >
                    <span className={styles.text_plus_button} >+</span>Adicionar
                </Clickable>
            </header>
            <p>Vizualise suas metas!</p>

            <ObjetivosFiltroBar
                search={search}
                setSearch={setSearch}
                categoria={categoria}
                setCategoria={setCategoria}
                data={data}
                setData={setData}
            />

            <section className={styles.tabela_container} >
                <table className={styles.tabela_objetivos} >
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Data de Criação</th>
                            <th>Progresso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {objetivos_filtrados.map((objetivo, key) => (
                            <tr key={key} onClick={() => goToDetails(objetivo)} >
                                <td>
                                    <p className={styles.descricao} >{objetivo.descricao}</p>
                                    <div className={styles.resultados_info} >
                                        <span className={styles.icon_check} ><Icon icon='check' /></span>
                                        <span>{objetivo.resultados.length} Resultados Alcançados</span>
                                    </div>
                                </td>
                                <td className={styles.data_criacao} >{dateString(objetivo.data_criacao)}</td>
                                <td><ProgressBar value={objetivo.progresso} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

        </Page>
    )
}

function ProgressBar ({value}) {

    const clampValue = Math.max(0, Math.min(100, value))

    return (
        <div
            className={styles.progress}
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={clampValue}
        >
            <div
                className={styles.progress_fill}
                style={{ width: `${clampValue}%` }}
            >
                <span className={styles.progress_label}>{clampValue}%</span>
            </div>
        </div>
    );

}

function ObjetivosFiltroBar({
  search,
  setSearch,
  categoria,
  setCategoria,
  data,
  setData,
}) {
  return (
    <div className={styles.filtroBar}>
      {/* Campo de busca */}
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Buscar objetivo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filtro por categoria */}
      <div className={styles.inputGroup}>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Profissional">Profissional</option>
          <option value="Saúde">Saúde</option>
          <option value="Financeiro">Financeiro</option>
          <option value="Estudos">Estudos</option>
        </select>
      </div>

      {/* Filtro por data */}
      <div className={styles.inputGroup}>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
    </div>
  );
}