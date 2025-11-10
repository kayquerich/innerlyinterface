import { InternalPage as Page } from "../components/Container"
import styles from '../styles/registros.module.css'
import { Registro } from "../components/Registro"
import { GoToAddRegistro as Add } from "../components/Button"
import { Subtitle } from "../components/Text"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { getRegistrosByUser, getUsuario } from "../services/Usuarios"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

export default function UserRegistros () {

    const location = useLocation()
    const data_login = location.state

    const [usuario, setUsuario] = useState()
    const [registros, setRegistros] = useState([])

    // eslint-disable-next-line
    useEffect(() => {

        const fetch_dados = async () => {

            let temporary_user = null

            const saved = sessionStorage.getItem('registros')
            const savedUser = sessionStorage.getItem('usuario')

            if (savedUser) {

                temporary_user = JSON.parse(savedUser);
                setUsuario(temporary_user);

            } else if (data_login && 'email' in data_login) {

                setUsuario(data_login);
                temporary_user = data_login;
                sessionStorage.setItem('usuario', JSON.stringify(data_login));

            } else if (data_login && data_login.token) {
                const result = await getUsuario(data_login.token);
                temporary_user = { ...result, token: data_login.token };
                setUsuario(temporary_user);
                sessionStorage.setItem('usuario', JSON.stringify(temporary_user));
            }

            const sortRegistrosDesc = (arr) => {
                if (!Array.isArray(arr)) return arr || [];

                // possíveis campos de data que a API pode retornar
                const dateFields = ['created_at', 'createdAt', 'data', 'date', 'data_criacao', 'timestamp', 'created'];

                // encontra um campo de data presente em pelo menos um item
                const sample = arr.find(Boolean) || {};
                const dateField = dateFields.find((f) => f in sample);

                const cloned = [...arr];

                if (dateField) {
                    cloned.sort((a, b) => {
                        const da = new Date(a[dateField]);
                        const db = new Date(b[dateField]);
                        return db - da; // decrescente
                    });
                    return cloned;
                }

                // fallback para id numérico (maior id = mais recente)
                if ('id' in sample && !isNaN(Number(sample.id))) {
                    cloned.sort((a, b) => Number(b.id) - Number(a.id));
                    return cloned;
                }

                // último recurso: reverter a ordem
                return cloned.reverse();
            };

            if (!saved) {
                const query_registros = await getRegistrosByUser(temporary_user.id, temporary_user.token)
                const ordenados = sortRegistrosDesc(query_registros || []);
                setRegistros(ordenados);
                sessionStorage.setItem('registros', JSON.stringify(ordenados));
            } else {
                const parsed = JSON.parse(saved) || [];
                setRegistros(sortRegistrosDesc(parsed));
            }

        }

        fetch_dados()

    }, [data_login])

    const navigation = useNavigate()
    const handleclick_link = (path) => {
        navigation(path, {state : usuario})
    }

    return (
        <Page dados={usuario}>

            <div className={styles.header} >
                <Subtitle>Olá, {usuario ? usuario.nome : 'usuário'}!</Subtitle>
            </div>

            <nav className={styles.nav} >
                <ul className={styles.buttons_list} >
                    <li onClick={() => handleclick_link('/profissionais')}>
                        <div>
                            <span>
                                <Icon icon="user-doctor" />
                            </span>
                            <span>Profissionais</span>
                        </div>
                    </li>
                    <li onClick={() => handleclick_link('/objetivos')} >
                        <div>
                            <span>
                                <Icon icon="bullseye" />
                            </span>
                            <span>
                                Objetivos
                            </span>
                        </div>
                    </li>
                </ul>
            </nav>

            <div className={styles.header} >
                <Subtitle>Meus Registros</Subtitle>
            </div>

            <div className={styles.containerregistros}>

                {registros.length < 1 ? (
                    <div style={{width : '100%', display : 'flex', alignItems : 'center', justifyContent : 'center', paddingTop : '17%'}}>
                        <h1 style={{color : 'gray', opacity : '50%'}}>Começe a escrever suas emoções por aqui!</h1>
                    </div>
                ) : (<></>)}

                {registros.map((registro, index) => (
                    <Registro registro={registro} dados={usuario} key={index} />
                ))}
                
            </div>

            <Add dados={usuario}/>

        </Page>
    )
}