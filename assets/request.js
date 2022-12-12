const queryParams = '?limit=100000&offset=0'

const fetchPokemons = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon' + queryParams)
    const data = await response.json()

    //console.log(data, 'data')
    return data;
}

const pokemonsUrls = async (find) => {
    const { results } = await fetchPokemons();

    const urls = results.map(pokemons => pokemons.url)

    const pokemonInfo = await Promise.all(
        urls.map(async url => {
            const nextPokemon = await fetch(url);
            return await nextPokemon.json();

        })
    )
    const pokemonFind = pokemonInfo.find(pokemon => pokemon.id === find)
    return pokemonFind;
}

