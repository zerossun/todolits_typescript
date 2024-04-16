import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PokemonDetails from './PokemonDetails';


const PokemonDetailsPage = () => {

    const { id } = useParams();
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => { 
        const fetchData = async () => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            
            const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            
            const koreanName = speciesResponse.data.names.find((name) => name.language.name === 'ko');
            
            setPokemonData({ ...response.data, korean_name: koreanName.name });
            
        };
        fetchData();
     }, [id]);

    return <PokemonDetails pokemon={pokemonData} />
  
}
export default PokemonDetailsPage;