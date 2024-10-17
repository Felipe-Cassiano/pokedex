import './Body.css'
import './SearchBar.css'
import './PokeInfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';


function Body() {

    //recebe o valor da imagem do pokémon escolhido
    const [pkmnName, setPkmnName] = useState('')
    const [pkmnImg, setPkmnImg] = useState('')
    // recebe valor dos status
    const [pkmnStatus, setPkmnStatus] = useState({})
    //decide qual pokémon vai ser escolhido
    const [pkmnId, setPkmnId] = useState('')

    //função assíncrona para dar fetch() na PokeAPI e receber o JSON do pokémon
    async function testeApi(pkmnId) {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnId}`); //fetch() na API
            const dataPkmn = await res.json(); //transforma o fetch() em um objeto JSON
            setPkmnImg(dataPkmn.sprites.front_default); //denomina o valor da imagem do pokémon
            setPkmnName(dataPkmn.species.name)
            // recebe o valor dos status do pokémon
            setPkmnStatus({
                hp: 'HP: ' + dataPkmn.stats[0].base_stat,
                attack: 'Attack: ' + dataPkmn.stats[1].base_stat,
                defense: 'Defense: ' + dataPkmn.stats[2].base_stat,
                spAttack: 'Special Attack: ' + dataPkmn.stats[3].base_stat,
                spDefense: 'Special Defense: ' + dataPkmn.stats[4].base_stat,
                speed: 'Speed: ' + dataPkmn.stats[5].base_stat,
            })
        }
        catch (err) {
            console.error(err) //sinalizar caso aconteça algum erro
        }
    }

    //função que chama a testeApi ao clicar no botão
    const handleSrc = () => {
        testeApi(pkmnId);
    }

    //função que define qual pokémon vai ser escolhido, com base no valor do input
    const handleChange = (event) => {
        setPkmnId(event.target.value.toLowerCase());
    };

    return (
        <div className="Body-container">
            <div className="SearchBar-container">
                <input type="text" className="SearchBar-input"
                    placeholder="Digite o nome de um Pokémon!"
                    onChange={handleChange}
                />
                <button className="SearchBar-button"
                    onClick={handleSrc}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <p>{pkmnName}</p>
                <img src={pkmnImg ? pkmnImg : 'https://placehold.co/96'} alt="" />
                <ul>
                    <li>{pkmnStatus.hp}</li>
                    <li>{pkmnStatus.attack}</li>
                    <li>{pkmnStatus.defense}</li>
                    <li>{pkmnStatus.spAttack}</li>
                    <li>{pkmnStatus.spDefense}</li>
                    <li>{pkmnStatus.speed}</li>
                </ul>
            </div>
        </div>
    )
}

export default Body