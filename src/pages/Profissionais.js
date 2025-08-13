import { InternalPage as Page } from "../components/Container"
import { SearchBar } from "../components/Search"
import { Subtitle } from '../components/Text'
import { FollowPreview, ProfessionalOption } from "../components/Card"
import styles from '../styles/profissionais.module.css'
import { useEffect, useState } from "react"
import { buscarNomes, listarAcompanhamentos, listarProfissionais } from "../services/Usuarios"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome"

export default function Profissionais () {

    const [follows, setFollows] = useState([])
    const [usuario, setUsuario] = useState()
    const [names, setNames] = useState([])
    const [largura, setLargura] = useState(window.innerWidth)

    useEffect(() => {

        const saved = sessionStorage.getItem('acompanhamentos')
        const saved_follows = saved ? JSON.parse(saved) : [] 
        const saved_user = JSON.parse(sessionStorage.getItem('usuario'))
        const saved_names = JSON.parse(sessionStorage.getItem('profissionais_nomes')) || []
        setUsuario(saved_user)
        
        const fetchAcompanhamentos = async () => {
            
            if (!saved_follows.length) {

                const query_follows = await listarAcompanhamentos(saved_user.token)
                setFollows(query_follows)
                sessionStorage.setItem('acompanhamentos', JSON.stringify(query_follows))

            } else {
                setFollows(saved_follows)
            }
        }

        const fetchNomes = async () => {
            if (!saved_names.length) {
                const query_names = await buscarNomes()
                setNames(query_names)
                sessionStorage.setItem('profissionais_nomes', JSON.stringify(query_names))
                return
            }
            setNames(saved_names)
        }

        fetchNomes()
        fetchAcompanhamentos()

        function handleResize () {
            setLargura(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }

    }, [])

    const [profissionais, setProfissionais] = useState([])
    const [buscou, setBuscou] = useState(false)
    const handleSearch = async (string) => {
        setBuscou(true)
        const result = await listarProfissionais(usuario.token, string)
        setProfissionais(result)
    }

    const lista_recentes = JSON.parse(sessionStorage.getItem('recentes')) || []
    const [savedView, setSavedView] = useState(true)
    const searchClick = () => {
        setSavedView(!savedView)
    }

    return (
        <Page dados={usuario}>
            <div className={styles.page} >
                
                <div className={styles.container_saved} style={(!savedView && largura < 925) ? {display : 'none'} : {}}>
                    <Subtitle>Profissionais que te acompanham</Subtitle>
                    <div className={styles.container}>
                        {follows.map((follow, key) => (
                            follow.is_ativo && <FollowPreview dados={follow} key={key}/>
                        ))}
                    </div>
                </div>
                
                <div className={styles.container_search} style={(largura < 925 && savedView) ? {display : 'none'} : {}} >
                
                    <SearchBar
                        values={names}
                        action={handleSearch}
                        placeholder='Buscar Profissionais...'
                        close={() => setBuscou(false)}
                    />
                
                    {buscou ? (
                        <>
                            <p>Profissionais encontrados</p>
                            <div style={{ display : 'flex', flexDirection : 'column', gap : 15 }} >
                                {profissionais.map((item, index) => (
                                    <ProfessionalOption dados={item} key={index} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <p>Recentes</p>
                            <div style={{ display : 'flex', flexDirection : 'column', gap: 15 }} >
                                {lista_recentes.map((item, index) => (
                                    <ProfessionalOption dados={item} key={index} />
                                ))}
                            </div>
                        </>
                    )}
                
                </div>
                
                <button className={styles.search_button} onClick={searchClick} >
                    {savedView ? (
                        <Icon icon='search'/>
                    ) : (
                        <Icon icon='chevron-left'/>
                    )}
                </button>

            </div>
        </Page>
    )

}