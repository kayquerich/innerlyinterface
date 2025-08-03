import { InternalPage as Page } from "../components/Container"
import { SearchBar } from "../components/Search"
import { Subtitle } from '../components/Text'
import { CardAcompanhamento, ProfessionalOption } from "../components/Card"
import styles from '../styles/profissionais.module.css'
import { useEffect, useState } from "react"
import { listarAcompanhamentos, listarProfissionais } from "../services/Usuarios"

export default function Profissionais () {

    const [follows, setFollows] = useState([])
    const [usuario, setUsuario] = useState()

    useEffect(() => {

        const saved = sessionStorage.getItem('acompanhamentos')
        const saved_follows = saved ? JSON.parse(saved) : [] 
        const saved_user = JSON.parse(sessionStorage.getItem('usuario'))
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

        fetchAcompanhamentos()

    }, [])

    const [profissionais, setProfissionais] = useState([])

    const handleSearch = async (string) => {
        const result = await listarProfissionais(usuario.token, string)
        setProfissionais(result)
    }

    return (
        <Page dados={usuario} style={{display : 'flex'}} >

            <div className={styles.container_saved} >
                <Subtitle>Profissionais que te acompanham</Subtitle>
                <div className={styles.container}>
                    {follows.map((follow, key) => (
                        follow.is_ativo && <CardAcompanhamento dados={follow} key={key}/>
                    ))}
                </div>
            </div>
            <div className={styles.container_search} >
                <SearchBar action={handleSearch} placeholder='Buscar Profissionais...' />
                <p>Profissionais encontrados</p>
                <div style={{ display : 'flex', flexDirection : 'column', gap : 15 }} >
                    {profissionais.map((item, index) => (
                        <ProfessionalOption dados={item} key={index} />
                    ))}
                </div>
            </div>

        </Page>
    )

}