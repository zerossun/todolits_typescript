import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function User() {
    const [pokemonData, setPokemonData] = useState([]);


useEffect(() => {
    // api 가져오기
    const fetchData = async () => {
        //allPokemonData 포켓몬 데이터 정보
        const allPokemonData = [];
        // 가져올 포켓몬 수 151마리
        
        for (let i = 1; i <= 151; i++) {
            // 해당 api에서 데이터 가져오기 
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            //한국어 설명 speciesResponse찾기
            const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
            
            const koreanName = speciesResponse.data.names.find(name => name.language.name === 'ko');
            // 가져온 데이터 및 찾은 한국어 allPokemonDat에 넣어주기
            allPokemonData.push({ ...response.data, korean_name: koreanName.name });
        }
        // setPokemonData안에 allPokemonData가 들어감 
        // 들어간 setPokemonData는 비어있던 pokemonData안으로 들어감
        setPokemonData(allPokemonData);
    };
        fetchData();
}, []);
    
    const renderPokemonList = () => {
        return pokemonData.map((pokemon) => (
            <div key={pokemon.id}>
                <img src={pokemon.sprites.front_default} alt='koreanName'></img>
                <b>{pokemon.korean_name}</b>
                <p>ID : { pokemon.id }</p>
            </div>
        ))
    }
  return (
    <div>
{renderPokemonList()}
    </div>
  )
}
