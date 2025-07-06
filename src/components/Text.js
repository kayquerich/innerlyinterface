import { useNavigate } from 'react-router-dom'
import styles from '../styles/text.module.css'
import { useState } from 'react'

export function Title ({children}) {
    return (
        <h1 className={styles.title}>{children}</h1>
    )
}

export function Subtitle({children}) {
    return (
        <h2 className={styles.subtitle}>{children}</h2>
    )
}

export function CadastroTitle () {
    return (
        <header style={{marginBottom : '1.5em'}}>
            <h1 className={styles.title}>Innerly</h1>
        </header>
    )
}

export function Line () {
    return (
        <hr style={{ border: '1px solid #ccc', margin: '10px 0', width : '100%' }} />
    )
}

export function Link ({path, children}) {

    const navigation = useNavigate()

    return (
        <p onClick={() => navigation(path)} className={styles.link} >{children}</p>
    )
}

export function Warning ({boolean}) {
    return (
        <>{boolean ? (<p style={{color : 'red'}} >Email ou senha incorretos!</p>) : <></>}</>
    )
}

export function ChangePageLink ({texts, boolean, action}) {

    const [text, setText] = useState(texts[0])

    const onHandleClick = () => {
        action(!boolean)
    }

    return (
        <p className={styles.link} onClick={onHandleClick}>{boolean ? texts[1] : texts[0]}</p>
    )
}

export function TitleForm ({children}) {
    return (
        <h2 style={{color : '#6161d7', fontWeight : 'bolder'}} >{children}</h2>
    )
}

export function SubtitleForm ({children}) {
    return (
        <h3 style={{fontWeight : '400'}}>{children}</h3>
    )
}

export function Separator({margin}) {
    return (
        <div style={{marginBlock : margin}}></div>
    )
}