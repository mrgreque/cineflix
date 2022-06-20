import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import api from "../../services/api";
import Erro from "../Erro";
import './film.css';
import {toast} from 'react-toastify';

function Film() {
    const { id } = useParams();

    const [film, setFilm] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilm() {
            await api.get(`movie/${id}`, {
                params: {
                    api_key: '897fdecd7101ff50c6cc9a198253f984',
                    language: 'pt-BR',
                }
            })
            .then(response => {
                setFilm(response.data);
                setLoading(false);
            })
            .catch(err => {return <Erro/>});
        };
        loadFilm();
    },[id]);

    function salvarFilme() {
        const favorites = localStorage.getItem('@favorites');

        let savedFilms = JSON.parse(favorites) || [];

        const hasFilm = savedFilms.some(saved => saved.id === film.id);

        if(!hasFilm) {
            savedFilms.push(film);
            localStorage.setItem('@favorites', JSON.stringify(savedFilms));
            toast.success('Filme adicionado à sua lista!');
        } else {
            toast.warn('Filme já se encontra adicionado em sua lista!');
        };

    };

    if(loading) {
        return <div className="film-info"><h2 className="loading">Carregando detalhes...</h2></div>
    };

    return(
        <div className="film-info">
            <h1>{film.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`} alt={film.title} />

            <h3>Sinopse:</h3>
            <span>{film.overview}</span>

            <strong>Avaliação: {film.vote_average}/10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=Trailer ${film.title}`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
};

export default Film;