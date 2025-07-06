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
                <Route path='/profissional/home' element={<Home/>}/>
            </Routes>
        </HashRouter>
    );  
}

export default App;
