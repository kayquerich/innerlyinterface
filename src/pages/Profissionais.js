import { InternalPage as Page } from "../components/Container"
import { SearchBar } from "../components/Search"
import { Separator, Subtitle } from '../components/Text'
import { CardAcompanhamento } from "../components/Card"
import styles from '../styles/profissionais.module.css'
import { useEffect, useState } from "react"
import { listarAcompanhamentos } from "../services/Usuarios"

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

            <Subtitle>Profissionais proximos a você</Subtitle>
            <div style={{display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
                <h1 style={{color : 'gray', opacity : '70%', paddingTop : '7%'}} >em desenvolvimento</h1>
            </div>

        </Page>
    )

}