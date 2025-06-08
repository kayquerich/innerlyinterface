import { fakeData } from "../assets/dados"
import { InternalPage as Page } from "../components/Container"

export default function Historico () {
    return (
        <Page dadosUsuario={fakeData}>
            <h1>Histórico</h1>
        </Page>
    )
}