import { InternalPage as Page } from "../components/Container"
import styles from '../styles/registros.module.css'
import { Registro } from "../components/Registro"
import { GoToAddRegistro as Add } from "../components/Button"
import { Subtitle } from "../components/Text"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { getRegistrosByUser, getUsuario } from "../services/Usuarios"

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

            if (!saved) {
                const query_registros = await getRegistrosByUser(temporary_user.id, temporary_user.token)
                setRegistros(query_registros.reverse())
                sessionStorage.setItem('registros', JSON.stringify(query_registros));
            } else {
                setRegistros(JSON.parse(saved))
            }

        }

        fetch_dados()

    }, [data_login])

    return (
        <Page dados={usuario}>

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