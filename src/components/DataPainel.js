import { Line, PainelTitle } from "./Text";
import styles from '../styles/painel.module.css'
import { Clickable } from "./Button";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

export function DataPainel ({dados, execute}) {
    return (
        <div className={styles.container} >
            {console.log(dados)}
            <header>

                <PainelTitle>Informações Pessoais</PainelTitle>

                <Clickable color={'var(--title-blue)'} action={execute}>
                    <div style={{ display : 'flex', gap : 10 }} >
                        <Icon icon='pen' color='white' />
                        <p>Editar</p>
                    </div>
                </Clickable>

            </header>

            <Line/>

            <div className={styles.informacoes} >

                <div className={styles.coluna} >
                    <div>
                        <p className={styles.label} >Nome</p>
                        <p>{dados.nome}</p>
                    </div>
                    <div>
                        <p className={styles.label} >Username</p>
                        <p>{dados.username}</p>
                    </div>
                </div>

                <div className={styles.coluna} >
                    <div>
                        <p className={styles.label} >Email</p>
                        <p>{dados.email}</p>
                    </div>
                    <div>
                        <p className={styles.label} >Contato</p>
                        <p>{dados.contato}</p>
                    </div>
                </div>

                <div className={styles.coluna} >
                    <div>
                        <p className={styles.label} >Gênero</p>
                        <p>{dados.genero}</p>
                    </div>
                    <div>
                        <p className={styles.label} >Nascimento</p>
                        <p>{dados.nascimento}</p>
                    </div>
                </div>

                {(dados && 'credencial' in dados) && (
                    <div className={styles.coluna} >
                        <div>
                            <p className={styles.label} >Credenciais</p>
                            <p>{dados.credencial}</p>
                        </div>
                        <div>
                            <p className={styles.label} >Código de Acompanhamento</p>
                            <p>{dados.codigo_acompanhamento}</p>
                        </div>
                    </div>
                )}

            </div>

        </div>
    )
}
