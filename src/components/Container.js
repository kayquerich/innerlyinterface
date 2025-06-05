import { SideBar } from "./SideBar"
import styles from '../styles/global.module.css'

export function Page ({children}) {
    return (
        <div className={styles.pages}>
            {children}
        </div>
    )
}

export function InternalPage ({children, dadosUsuario}) {

    return (
        <div className={styles.pages} style={{display : "flex", overflowY : 'auto', flex : 1}}>
            <SideBar dadosUsuario={dadosUsuario}/>
            <div style={{width : '80%', padding : '2%', height : '100%'}}>
                {children}
            </div>
        </div>
    )
}