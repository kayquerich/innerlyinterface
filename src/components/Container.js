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
        <div className={styles.internalpages}>
            <SideBar dadosUsuario={dadosUsuario}/>
            <div className={styles.internalcontainer}>
                {children}
            </div>
        </div>
    )
}