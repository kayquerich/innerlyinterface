import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro'
import UserRegistros from './pages/Registros';
import './assets/icons'
import Perfil from './pages/Perfil';
import Adicionar from './pages/Adicionar';
import Detalhes from './pages/Detalhes';
import Historico from './pages/Historico';
import Home from './pages/profissional/Home';
import PerfilProfissional from './pages/profissional/Perfil';
import Solicitacoes from './pages/profissional/Solicitacoes';
import FileRegistro from './pages/profissional/Detalhes';
import Profissionais from './pages/Profissionais';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/cadastro' element={<Cadastro/>} />
                <Route path='/registros' element={<UserRegistros/>}/>
                <Route path='/perfil' element={<Perfil/>}/>
                <Route path='/registros/adicionar' element={<Adicionar/>}/>
                <Route path='/registros/detalhes' element={<Detalhes/>}/>
                <Route path='/historico' element={<Historico/>}/>
                <Route path='/profissionais' element={<Profissionais/>}/>
                <Route path='/profissional/home' element={<Home/>}/>
                <Route path='/profissional/perfil' element={<PerfilProfissional/>}/>
                <Route path='/profissional/solicitacoes' element={<Solicitacoes/>}/>
                <Route path='/profissional/registro/detalhes' element={<FileRegistro/>}/>
            </Routes>
        </HashRouter>
    );  
}

export default App;
