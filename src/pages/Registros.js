import { InternalPage as Page } from "../components/Container"
import styles from '../styles/registros.module.css'
import { Registro } from "../components/Registro"
import { GoToAddRegistro as Add } from "../components/Button"
import { Title } from "../components/Text"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { getRegistrosByUser, getUsuario } from "../services/Usuarios"

export default function UserRegistros () {

    const location = useLocation()
    const data_login = location.state

    const [usuario, setUsuario] = useState()
    const [registros, setRegistros] = useState()

    useEffect(() => {

        const fetchUsuario = async () => {

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
                setRegistros(query_registros)
                sessionStorage.setItem('registros', JSON.stringify(query_registros));
            } else {
                setRegistros(JSON.parse(saved))
            }
        }

        fetchUsuario()

    }, [])

    return (
        <Page dadosUsuario={usuario}>

            {console.log(registros)}

            <Title>Meus Registros</Title>

            <div className={styles.containerregistros}>
                
            </div>

            <Add dados={usuario}/>

        </Page>
    )
}