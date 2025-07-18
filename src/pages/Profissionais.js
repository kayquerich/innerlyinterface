import { InternalPage as Page } from "../components/Container"
import { SearchBar } from "../components/Search"
import { Separator, Subtitle } from '../components/Text'
import { CardAcompanhamento } from "../components/Card"
import styles from '../styles/profissionais.module.css'
import { useEffect, useState } from "react"
import { listarAcompanhamentos } from "../services/Usuarios"

export default function Profissionais () {

    const usuario = JSON.parse(sessionStorage.getItem('usuario'))
    const saved = sessionStorage.getItem('acompanhamentos')
    const saved_follows = saved ? JSON.parse(saved) : [] 

    const [follows, setFollows] = useState([])

    useEffect(() => {

        const fetchAcompanhamentos = async () => {
            if (!saved_follows.length) {

                const query_follows = await listarAcompanhamentos(usuario.token)
                setFollows(query_follows)
                sessionStorage.setItem('acompanhamentos', JSON.stringify(query_follows))

            } else {
                setFollows(saved_follows)
            }
        }

        fetchAcompanhamentos()

    })

    return (
        <Page dadosUsuario={usuario}>

            <SearchBar/>
            <Separator margin={20}/>

            <Subtitle>Profissionais que te acompanham</Subtitle>
                
            <div className={styles.container}>
                {follows.map((follow, key) => (
                    <CardAcompanhamento dados={follow} key={key}/>
                ))}
            </div>

        </Page>
    )

}