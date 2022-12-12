const form = document.getElementById('form')
const inputNumber = document.getElementById('number-input')
const pokemonContainer = document.querySelector('.pokemon-container')

let pokemonPrint = []

const isHidden = () => {
    pokemonContainer.classList.add('hidden')
}

const showContainer = () => {
    pokemonContainer.classList.remove('hidden')
}

const errorMessage = message => {
    pokemonContainer.innerHTML = `${message}
    <i class="fa-solid fa-triangle-exclamation warn"></i>`
    pokemonContainer.classList.add('error')
}


const getPokemonHtml = ({ name, types, height, weight, sprites }) => {
    return `
    <div class="pokemon-name-img">
    <h2>${name.toUpperCase()}</h2>
    <img src="${sprites.other.home.front_default}"
        alt="" />
    </div>

    <div class="pokemon-info">

    <div class="type">
        <h3>TIPO: </h3>
        <p>${types.map((tipo) => tipo.type.name).join(', ').toUpperCase()}</p>
    </div>

    <div class="measures">
        <h4>MEDIDAS:</h4>
        <div class="measures-info">
            <p>Peso: ${weight / 10}Kg</p>
            <span>Tamaño: ${height / 10}m</span>
        </div>
    </div>

    <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="pokemon-logo">
    </div>
    `
}

const renderPokemon = pokemons => {
    const html = pokemons.map(pokemon => getPokemonHtml(pokemon)).join('')
    pokemonContainer.innerHTML = html;
}

const searchPokemon = async (e) => {
    e.preventDefault();

    const inputSearch = inputNumber.value
    const inputInt = parseInt(inputSearch)

    const pokemonID = await pokemonsUrls(inputInt)

    if (!inputSearch) {
        errorMessage('Debe ingresar un valor')
        showContainer();
        form.reset();
        return;
        //renderizarlo en la tarjeta container
    } else if (!pokemonID) {
        errorMessage('No hay pokemones para el ID ingresado.')
        showContainer();
        form.reset();
        return;
        //renderizarlo en la tarjeta container
    } else {
        pokemonPrint = [pokemonID]
        showContainer();
        renderPokemon(pokemonPrint);
        form.reset();
        return
    }


}

function init() {
    form.addEventListener('submit', searchPokemon)
    isHidden();
}

init()