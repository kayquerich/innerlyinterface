import { HashRouter, Routes, Route } from 'react-router-dom';
import './assets/icons'
import Login from './pages/Login';
import Cadastro from './pages/Cadastro'
import UserRegistros from './pages/Registros';
import Perfil from './pages/Perfil';
import Adicionar from './pages/Adicionar';
import Detalhes from './pages/Detalhes';
import Home from './pages/profissional/Home';
import PerfilProfissional from './pages/profissional/Perfil';
import FileRegistro from './pages/profissional/Detalhes';
import Profissionais from './pages/Profissionais';
import Acompanhamento from './pages/Acompanhamento';
import Solicitacao from './pages/Solicitacao';
import Responder from './pages/profissional/Responder';
import Clientes from './pages/profissional/Clientes';
import CadastroProfissional from './pages/profissional/CadastroProfissional';
import Historico from './pages/Historico';
import Objetivos from './pages/Objetivos';
import AdicionarObjetivo from './pages/AdicionarObjetivo';
import VizualizarObjetivo from './pages/VizualizarObjetivo';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/cadastro' element={<Cadastro/>} />
                <Route path='/profissional/cadastro' element={<CadastroProfissional/>} />
                <Route path='/registros' element={<UserRegistros/>}/>
                <Route path='/perfil' element={<Perfil/>}/>
                <Route path='/registros/adicionar' element={<Adicionar/>}/>
                <Route path='/registros/detalhes' element={<Detalhes/>}/>
                <Route path='/profissionais' element={<Profissionais/>}/>
                <Route path='/acompanhamento' element={<Acompanhamento/>}/>
                <Route path='/profissional/home' element={<Home/>}/>
                <Route path='/profissional/perfil' element={<PerfilProfissional/>}/>
                <Route path='/profissional/registro/detalhes' element={<FileRegistro/>}/>
                <Route path='/solicitacao' element={<Solicitacao/>}/>
                <Route path='/profissional/solicitacao' element={<Responder/>}/>
                <Route path='/profissional/clientes' element={<Clientes/>}/>
                <Route path='/historico' element={<Historico/>}/>
                <Route path='/objetivos' element={<Objetivos/>}/>
                <Route path='/objetivos/adicionar' element={<AdicionarObjetivo/>}/>
                <Route path='/objetivos/detalhes' element={<VizualizarObjetivo/>} />
            </Routes>
        </HashRouter>
    );  
}

export default App;
