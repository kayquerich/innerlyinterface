import { InternalPage as Page } from "../../components/Container";
import { DataPainel } from "../../components/DataPainel";
import { ProfissionalHeader as Header} from "../../components/Header";
import { PainelTitle, Subtitle, Line } from "../../components/Text";
import styles from '../../styles/perfil.module.css'

export default function PerfilProfissional () {

    const profissional = JSON.parse(sessionStorage.getItem('profissional'))

    return (
        <Page dados={profissional}>

            <Subtitle>Meu Perfil</Subtitle>
            
            <Header dados={profissional} />
            <DataPainel dados={profissional} />

            {(profissional && 'credencial' in profissional) && (
                <div className={styles.painel_especialidades} >
                    <PainelTitle>Areas de especialidade</PainelTitle>
                    <Line/>
                    <div style={{ display : 'flex', gap : 10 }} >
                        <div className={styles.especialidade} >Especialidade</div>
                        <div className={styles.especialidade} >Em desenvolvimento</div>
                        <div className={styles.especialidade} >Especialidade</div>
                    </div>
                </div>
            )}

        </Page>
    )
}