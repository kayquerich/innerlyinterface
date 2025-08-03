import styles from '../styles/modal.module.css'
import { CloseModal } from './Button'
import { Line, PainelTitle } from './Text'

export function ModalModular ({close, title, children}) {
    return (
        <div className={styles.page} >
            <div className={styles.content_area} >
                <header className={styles.header} >
                    <CloseModal execute={close} />
                    <PainelTitle>{title}</PainelTitle>
                </header>
                <Line/>

                {children}

            </div>
        </div>
    )
}