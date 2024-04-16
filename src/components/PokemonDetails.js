const PokemonDetails = ({ pokemon }) => {

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  const renderTypes = () => {
    console.log(pokemon.types.length)
    return pokemon.types.map((type) => <span key={type.type.name}>
      {type.type.korean_name}{ }</span>);
  
  };

  const renderAbilities = () => {
    return pokemon.abilities.map((ability) => <span key={ability.ability.name}>{ability.ability.name}</span>);
  };

  const renderMoves = () => {
    return pokemon.moves.map((move) => <li key={move.move.name}>{move.move.name}</li>);
  };


  return (
    <div>
      <h2>{pokemon.korean_name} (#{pokemon.id})</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.korean_name} />
      <p>이름: {pokemon.korean_name}</p>
      <p>높이: {pokemon.height}</p>
      <p>넓이: {pokemon.weight}</p>
      <p>타입: {renderTypes()}</p>
      <p>능력: {renderAbilities()}</p>
      <p>특성:</p>
      <ul>{renderMoves()}</ul>
    </div>
  );
};

export default PokemonDetails;