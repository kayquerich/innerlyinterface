import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro'
import UserRegistros from './pages/Registros';
import './assets/icons'
import Perfil from './pages/Perfil';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/cadastro' element={<Cadastro/>} />
                <Route path='/registros' element={<UserRegistros/>}/>
                <Route path='/perfil' element={<Perfil/>}/>
            </Routes>
        </HashRouter>
    );  
}

export default App;
