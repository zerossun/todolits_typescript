import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../scss/pokeindex.css";
import InfiniteScroll from "react-infinite-scroller";

const pokemonPerPage = 5;
const totalPokemon = 80;

export default function PokemIndex() {
  const [pokemonData, setPokemonData] = useState([]);

  const fetchData = async () => {
    const allPokemonData = [];
    const start = pokemonData.length + 1;

    for (let i = start; i < start + pokemonPerPage; i++) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${i}`        
      );
      allPokemonData.push(response.data);
    }

    setPokemonData([...pokemonData, ...allPokemonData]);
  };

  return (
    <InfiniteScroll
      pageStart={1}
      style={{ margin: "10px" }}
      hasMore={totalPokemon > pokemonData.length}
      loadMore={fetchData}
      loader={<h4 key={0}>Loading...</h4>}
      className="container"
      initialLoad={true}
    >
      {pokemonData &&
        pokemonData.map((pokemon) => (
          <div key={pokemon.id} className="pokemon">
            <Link to={`/pokemon/${pokemon.id}`}>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.korean_name}
              />
              {/* <p>{pokemon.korean_name}</p> */}
              <p>도감번호: {pokemon.id}</p>
            </Link>
          </div>
        ))}
    </InfiniteScroll>
  );
}