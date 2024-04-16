import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import '../scss/pokeindex.css'
import InfiniteScroll from 'react-infinite-scroller';

export default function PokemIndex() {

    const [pokemonData, setPokemonData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const pokemonPerPage = 40;
    const totalPokemon = 160;
  

    useEffect(() => {
        const fetchData = async () => {
            const allPokemonData = [];
            try {
                setLoading(true);
                setError(null);

                for (let i = 1; i <= Math.min(currentPage * pokemonPerPage, totalPokemon); i++) {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
                    const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
                    const koreanName = speciesResponse.data.names.find((name) => name.language.name === 'ko');
                    allPokemonData.push({ ...response.data, korean_name: koreanName.name });
                }
                setPokemonData(allPokemonData);
                
            } catch (e) {
                setError(e)
            }
            setLoading(false);
        }
        fetchData();
    }, [currentPage]);

    const fetchMoreData = () => {
        setCurrentPage((prevPage) => prevPage + 1);
      };

    if(error) return <div>에러가 났습니다.</div>
    if(loading) return <div>로딩중입니다.</div>
  
    console.log(currentPage * pokemonPerPage < totalPokemon)
    console.log(currentPage)
    console.log(pokemonPerPage)
    console.log(totalPokemon)
    
    return (
        <InfiniteScroll
        pageStart = { 1 }
        hasMore={true}
        loadMore = {()=>console.log(1)}
        loader={<h4>Loading...</h4>}
        
        className="container"
      >
  
  {pokemonData && pokemonData.map((pokemon) => (
        <div key={pokemon.id} className="pokemon">
          <Link to={`/pokemon/${pokemon.id}`}>
            <img src={pokemon.sprites.front_default} alt={pokemon.korean_name} />
            <p>{pokemon.korean_name}</p>
            <p>도감번호: {pokemon.id}</p>
          </Link>
        </div>
      ))}
    </InfiniteScroll>
  )
}
