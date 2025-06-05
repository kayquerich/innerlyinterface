import { SideBar } from "./SideBar"
import styles from '../styles/global.module.css'

export function InternalPage ({children, dadosUsuario}) {
    return (
        <div className={styles.pages} style={{display : "flex"}}>
            <SideBar dadosUsuario={dadosUsuario}/>
            <div style={{width : '80%', padding : '2%'}}>
                {children}
            </div>
        </div>
    )
}