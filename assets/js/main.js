const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

var modal = document.getElementById("detailModal");
var span = document.getElementsByClassName("close")[0];
var modalContent = document.getElementsByClassName('poke-details')[0];

const maxRecords = 151
const limit = 12
let offset = 0;


function convertPokemonToDetails(pokemon) {
    
    return `
        <li class="pokemon ${pokemon.type}">
        <img class="modal_image" src="${pokemon.photo}")"
                    alt="${pokemon.name}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<spam class="type ${type}">${type}</spam>`).join('')}
                </ol>

            </div>
            <div class="name">
                <ul>
                    <li>Base Experience: ${pokemon.base_experience} points</li>
                    <li>Height: ${pokemon.height} cm</li>
                    <li>Weight: ${pokemon.weight} kg</li>
                    <li>Abilities: ${pokemon.abilities.map((ability) => `${ability}`).join(', ')} </li>
                    <li>Moves: ${pokemon.moves.map((move) => `${move}`).join(', ')} </li>
                </ul>
            </div>

        </li>
    `
}


function details(number) {
   
    //var h1 = document.createElement("h1");
    //h1.innerText = number;
    
    
    //var modalContent = document.getElementsByClassName('modal-content')[0];

    var pok_detail = 
    pokeApi.getPokemonMoreDetail(number).then(poke_detail => {
        //console.log(poke_detail);
       // modalName.innerText = poke_detail.name;
        modalContent.innerHTML += convertPokemonToDetails(poke_detail);
       
    });
   
    
   
    

    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
    modalContent.innerHTML = ""

}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modalContent.innerHTML = "";
    }
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img id="${"imagem" + pokemon.number}" src="${pokemon.photo}" onclick="details('${pokemon.number}')"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })


}



loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})