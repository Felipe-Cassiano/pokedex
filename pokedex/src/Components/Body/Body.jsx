import './Body.css'
import './SearchBar.css'
import './PokeInfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faWeightHanging, faRuler } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';


function Body() {
    // recebe valor dos status
    const [pkmnInfo, setPkmnInfo] = useState({})
    //decide qual pokémon vai ser escolhido
    const [pkmnId, setPkmnId] = useState('')

    const [bgImg, setBgImg] = useState('')

    useEffect(() => {
        document.querySelector('.PokeInfo-container').style.backgroundImage = bgImg;
      }, [bgImg]);

    //função assíncrona para dar fetch() na PokeAPI e receber o JSON do pokémon
    async function testeApi(pkmnId) {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnId}`); //fetch() na API
            const dataPkmn = await res.json(); //transforma o fetch() em um objeto JSON
            // recebe o valor dos status do pokémon
            setPkmnInfo({
                img: dataPkmn.sprites.front_default,

                name: dataPkmn.species.name,

                height: (dataPkmn.height) / 10,
                weight: (dataPkmn.weight) / 10,

                type0: await `/assets/types/${dataPkmn.types[0].type.name}.png`,
                type1: await dataPkmn.types[1] ? `/assets/types/${dataPkmn.types[1].type.name}.png` : '',


                hp: 'HP: ' + dataPkmn.stats[0].base_stat,
                attack: 'Attack: ' + dataPkmn.stats[1].base_stat,
                defense: 'Defense: ' + dataPkmn.stats[2].base_stat,
                spAttack: 'Special Attack: ' + dataPkmn.stats[3].base_stat,
                spDefense: 'Special Defense: ' + dataPkmn.stats[4].base_stat,
                speed: 'Speed: ' + dataPkmn.stats[5].base_stat,
            })

            switch (dataPkmn.types[0].type.name) {
                case 'grass':
                    setBgImg('https://i.pinimg.com/originals/07/e6/1f/07e61fbf05448a264881906c53b90367.gif')
                    break;
            
                default:
                    setBgImg('https://i.pinimg.com/originals/23/95/54/2395544bff0ddf8217c28c645cf604e5.gif')
                    break;
            }
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
        <section className="Body-container">

            <div className="SearchBar-container">
                <input type="text" className="SearchBar-input"
                    placeholder="Digite o nome de um Pokémon!"
                    onChange={handleChange}
                />
                <button className="SearchBar-button"
                    onClick={handleSrc}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>

            <div className="PokeInfo-container">


                <div className="PokeInfo-container-info">
                    

                    <div className="PokeInfo-container-info-info1">
                        <img src={pkmnInfo.img ? pkmnInfo.img : 'https://placehold.co/96'} alt="" className='PokeInfo-container-info-info1-pkmn-img'/>

                        <div className="PokeInfo-container-info-info1-types">
                            <img src={pkmnInfo.type0} alt="" className='PokeInfo-container-info-info1-type'/>
                            <img src={pkmnInfo.type1 ? pkmnInfo.type1 : ''} alt="" className='PokeInfo-container-info-info1-type'/>
                        </div>

                    </div>

                    <div className="PokeInfo-container-info-info2">
                        <div><FontAwesomeIcon icon={faWeightHanging} /> {pkmnInfo.weight} kg</div>
                        <div><FontAwesomeIcon icon={faRuler} /> {pkmnInfo.height} m</div>
                    </div>
                </div>

                <div className="PokeInfo-container-name">
                    <p>{pkmnInfo.name}</p>
                </div>

                <div className="PokeInfo-container-stats">
                    <ul>
                        <li>{pkmnInfo.hp}</li>
                        <li>{pkmnInfo.attack}</li>
                        <li>{pkmnInfo.defense}</li>
                        <li>{pkmnInfo.spAttack}</li>
                        <li>{pkmnInfo.spDefense}</li>
                        <li>{pkmnInfo.speed}</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Body