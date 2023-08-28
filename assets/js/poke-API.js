
const pokeApi = {}


function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
    const [type] = types;


    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.gender = pokeDetail.gender_rate;
    pokemon.abilities = pokeDetail.abilities.map(ability => ability.ability.name).join('   ');
    pokemon.url = pokeDetail.url;
    return pokemon;
}

pokeApi.getPokemonDetail = pokemon => {
    return fetch(pokemon.url)
                .then(response => response.json())
                .then(convertPokeApiDetailToPokemon);
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



