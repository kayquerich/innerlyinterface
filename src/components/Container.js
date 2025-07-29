import { SideBar } from "./SideBar"
import styles from '../styles/container.module.css'

export function Page ({children}) {
    return (
        <div className={styles.pages}>
            {children}
        </div>
    )
}

export function InternalPage ({children, dados, style}) {

    return (
        <div className={styles.internalpages}>
            <SideBar dados={dados}/>
            <div className={styles.internalcontainer} style={style && style} >
                {children}
            </div>
        </div>
    )
}