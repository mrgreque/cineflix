import './favorite.css';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

function Favorites() {

    const [films, setFilms] = useState([]);

    useEffect(() => {
    
        const myFavorites = localStorage.getItem('@favorites');
        setFilms(JSON.parse(myFavorites) || []);

    },[]);

    function deleteFilm(id){
        if(films.length > 0) {
            const filtred = films.filter(film => film.id !== id);
            setFilms(filtred);
            localStorage.setItem('@favorites', JSON.stringify(filtred));
            toast.success('Filme removido da sua lista!');
        };
    };

    return(
        <div className='my-films'>
            <h1>Meus Filmes Aguardados:</h1>

            {films.length === 0 && <span>Você não esta aguardando nenhum filme 😅</span>}

            <ul>
                {films.map(film => (
                    <li key={film.id}>
                        <strong>{film.title}</strong>
                        <div>
                            <Link to={`/filme/${film.id}`}>Detalhes</Link>
                            <button onClick={() => deleteFilm(film.id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Favorites;