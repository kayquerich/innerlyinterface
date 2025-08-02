import { InternalPage as Page } from "../../components/Container"

export default function Clientes () {

    const profissional = JSON.parse(sessionStorage.getItem('profissional'))

    return (
        <Page dados={profissional} >  

        </Page>
    )

}