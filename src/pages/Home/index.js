import { useEffect, useState } from "react";
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './home.css';

// Route: movie/now_playing?
// Authentication and Language: api_key=897fdecd7101ff50c6cc9a198253f984&language=pt-BR 

function Home() {

    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilms() {
            const response = await api.get('movie/now_playing', {
                params: {
                    api_key: '897fdecd7101ff50c6cc9a198253f984',
                    language: 'pt-BR',
                    page: 1
                }
            });
            
            setFilms(response.data.results);
            setLoading(false);
        }
        loadFilms();
    }, []);

    if(loading) {
        return <div><h2 className="loading">Carregando filmes...</h2></div>
    }

    return(
        <div className="container">
            <div className="films-list">
                {films.map((film) => {
                    return(
                        <article key={film.id}>
                            <strong>{film.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} alt={film.title} />
                            <Link to={`/filme/${film.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
};

export default Home;