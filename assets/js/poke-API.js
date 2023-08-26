
const pokeApi = {}

pokeApi.getPokemonDetail = pokemon => {
    return fetch(pokemon.url).then(response => response.json());
}

pokeApi.getPokemon = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    return fetch(url)
        .then(response => response.json())
        .then(jsonBody => jsonBody.results)
        .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
        .then(detailsRequest => Promise.all(detailsRequest))
        .then(pokemonsDetails => pokemonsDetails)
        .catch(error => console.error(error));
}
