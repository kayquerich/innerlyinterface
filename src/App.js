import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro'
import UserRegistros from './pages/Registros';
import './assets/icons'
import Perfil from './pages/Perfil';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/cadastro' element={<Cadastro/>} />
                <Route path='/registros' element={<UserRegistros/>}/>
                <Route path='/perfil' element={<Perfil/>}/>
            </Routes>
        </BrowserRouter>
    );  
}

export default App;
