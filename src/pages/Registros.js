import { useState } from "react"
import { InternalPage as Container } from "../components/Container"
import styles from '../styles/global.module.css'
import iStyles from '../styles/registros.module.css'
import { Registro } from "../components/Registro"

export default function UserRegistros ({dadosUsuario}) {

    const [fakeData] = useState({
        nome : 'Kayque Richarlyson' 
    })

    const fakeRegistros = [
        {
            title : '05 de Maio de 2025',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, ducimus dicta consequatur culpa quia molestiae vel animi. In deserunt sunt iusto odio est culpa eum sapiente fugiat at, quasi ipsum.',
            valuehumor : 0
        },
        {
            title : '05 de Maio de 2025',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, ducimus dicta consequatur culpa quia molestiae vel animi. In deserunt sunt iusto odio est culpa eum sapiente fugiat at, quasi ipsum.',
            valuehumor : 1
        },
        {
            title : '05 de Maio de 2025',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, ducimus dicta consequatur culpa quia molestiae vel animi. In deserunt sunt iusto odio est culpa eum sapiente fugiat at, quasi ipsum.',
            valuehumor : 2
        },
        {
            title : '05 de Maio de 2025',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, ducimus dicta consequatur culpa quia molestiae vel animi. In deserunt sunt iusto odio est culpa eum sapiente fugiat at, quasi ipsum.',
            valuehumor : 3
        },
        {
            title : '05 de Maio de 2025',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, ducimus dicta consequatur culpa quia molestiae vel animi. In deserunt sunt iusto odio est culpa eum sapiente fugiat at, quasi ipsum.',
            valuehumor : 4
        },
        {
            title : '05 de Maio de 2025',
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, ducimus dicta consequatur culpa quia molestiae vel animi. In deserunt sunt iusto odio est culpa eum sapiente fugiat at, quasi ipsum.',
            valuehumor : 4
        },
    ]

    return (
        <Container dadosUsuario={fakeData}>
            <div style={{height : '100%', width : '100%'}}>
                <h1 className={styles.title}>Meus Registros</h1>
                <div className={iStyles.containerregistros}>
                    <Registro registro={fakeRegistros[0]}/>
                    <Registro registro={fakeRegistros[1]}/>
                    <Registro registro={fakeRegistros[2]}/>
                    <Registro registro={fakeRegistros[3]}/>
                    <Registro registro={fakeRegistros[4]}/>
                    <Registro registro={fakeRegistros[5]}/>
                </div>
            </div>
        </Container>
    )
}