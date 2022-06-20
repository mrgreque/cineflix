import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Film from './pages/Film';
import Erro from './pages/Erro';
import Favorites from './pages/Favorite';

import Header from './components/Header';

function RoutesApp() {
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:id" element={<Film />} />
                <Route path="/favoritos" element={<Favorites />} />
                <Route path="*" element={<Erro />} />
            </Routes>
        </BrowserRouter>
    )
};

export default RoutesApp;