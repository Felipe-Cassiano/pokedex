import './Body.css'
import './SearchBar.css'
import './PokeInfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faWeightHanging, faRuler, faStar } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';


function Body() {
    // recebe valor dos status
    const [pkmnInfo, setPkmnInfo] = useState({})
    //decide qual pokémon vai ser escolhido
    const [pkmnId, setPkmnId] = useState('')

    const background = {
        backgroundImage: `url(${pkmnInfo.bgImg})`
    }

    if (pkmnInfo.img) {
        document.querySelector(".PokeInfo-container-info").classList.remove('hidden')
        document.querySelector(".PokeInfo-container-name").classList.remove('hidden')
        document.querySelector(".PokeInfo-container-stats").classList.remove('hidden')
        document.querySelector(".PokeInfo-container-empty").classList.add('hidden')
    }

    //função assíncrona para dar fetch() na PokeAPI e receber o JSON do pokémon
    async function testeApi(pkmnId) {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnId}`); //fetch() na API
            const dataPkmn = await res.json(); //transforma o fetch() em um objeto JSON

            // recebe o valor dos status do pokémon
            setPkmnInfo({
                img: dataPkmn.sprites.front_default,
                imgShiny: dataPkmn.sprites.front_shiny,
                bgImg: `/assets/bgImgs/${dataPkmn.types[0].type.name}.gif`,

                name: dataPkmn.species.name,

                height: (dataPkmn.height) / 10,
                weight: (dataPkmn.weight) / 10,

                type0: `/assets/types/${dataPkmn.types[0].type.name}.png`,
                type1: dataPkmn.types[1] ? `/assets/types/${dataPkmn.types[1].type.name}.png` : '',


                hp: dataPkmn.stats[0].base_stat,
                widthHp: Math.min(dataPkmn.stats[0].base_stat, 255),

                attack: dataPkmn.stats[1].base_stat,
                widthAttack: Math.min(dataPkmn.stats[1].base_stat, 255),

                defense: dataPkmn.stats[2].base_stat,
                widthDefense: Math.min(dataPkmn.stats[2].base_stat, 255),

                spAttack: dataPkmn.stats[3].base_stat,
                widthSpAttack: Math.min(dataPkmn.stats[3].base_stat, 255),

                spDefense: dataPkmn.stats[4].base_stat,
                widthSpDefense: Math.min(dataPkmn.stats[4].base_stat, 255),

                speed: dataPkmn.stats[5].base_stat,
                widthSpeed: Math.min(dataPkmn.stats[5].base_stat, 255),
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

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents default Enter behavior
            handleSrc(); // Calls the button function
        }
    };

    //função que define qual pokémon vai ser escolhido, com base no valor do input
    const handleChange = (event) => {
        setPkmnId(event.target.value.toLowerCase());
    }

    const handleColor = (stat) => {
        if (stat < 75) {
            // 0 to 100 range: transition from red to green
            const green = Math.round(stat * 2.55); // Scale green from 0 to 255
            return `rgb(255, ${green}, 0)`; // Transition from red to green
          } else if (stat === 75) {
            // Exactly 100: color is green
            return `rgb(0, 255, 0)`; // Full green
          } else {
            // Beyond 100: transition from green to blue
            const blue = Math.round((stat - 100) * 2.55); // Scale blue from 0 to 255
            return `rgb(0, 200, ${blue})`; // Keep green at max, transition blue
         }
    }

    const handleShiny = () => {
        if (document.querySelector('.PokeInfo-container-info-info1-pkmn-img').src == pkmnInfo.img) {
            document.querySelector('.PokeInfo-container-info-info1-pkmn-img').src = pkmnInfo.imgShiny
        } else {
            document.querySelector('.PokeInfo-container-info-info1-pkmn-img').src = pkmnInfo.img
        }
        
    }

    return (
        <section className="Body-container">

            <div className="SearchBar-container">
                <input type="text" className="SearchBar-input"
                    placeholder="I choose you:"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button className="SearchBar-button"
                    onClick={handleSrc}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size='xl'/>
                </button>
            </div>

            <div className="PokeInfo-container"
                style={background}
            >
                <div className="PokeInfo-container-info hidden">


                    <div className="PokeInfo-container-info-info1">
                        <img src={pkmnInfo.img ? pkmnInfo.img : 'https://placehold.co/96'} alt="" className='PokeInfo-container-info-info1-pkmn-img' />

                        <div className="PokeInfo-container-info-info1-types">
                            <img src={pkmnInfo.type0} alt="" className='PokeInfo-container-info-info1-type' />
                            <img src={pkmnInfo.type1 ? pkmnInfo.type1 : ''} alt="" className='PokeInfo-container-info-info1-type' />
                        </div>

                    </div>

                    <div className="PokeInfo-container-info-info2">
                        <div className='PokeInfo-container-info-info2-icon'
                            style={{ "--after-content": `"${pkmnInfo.weight} kg` }}>
                            <FontAwesomeIcon icon={faWeightHanging} />
                        </div>

                        <div className='PokeInfo-container-info-info2-icon'
                            style={{ "--after-content": `"${pkmnInfo.height} m` }}>
                            <FontAwesomeIcon icon={faRuler} />
                        </div>

                        <div className='PokeInfo-container-info-info2-icon'
                            style={{ "--after-content": `"Shiny` }}
                            onClick={handleShiny}>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </div>
                </div>

                <div className="PokeInfo-container-name hidden">
                    <p>{pkmnInfo.name}</p>
                </div>

                <div className="PokeInfo-container-stats hidden">
                    <ul>
                        <li className='PokeInfo-container-stats-stat'>
                            <div className="PokeInfo-container-stats-stat-name">HP <div className="PokeInfo-container-stats-stat-name-value">{pkmnInfo.hp}</div></div>
                            <div className="PokeInfo-container-stats-stat-value">
                                <div
                                className='PokeInfo-container-stats-stat-value-bar'
                                    style={{
                                        width: `${(pkmnInfo.widthHp / 255) * 100}%`,
                                        backgroundColor: handleColor(pkmnInfo.hp)
                                    }}>a</div>
                            </div>
                        </li>

                        <li className='PokeInfo-container-stats-stat'>
                            <div className="PokeInfo-container-stats-stat-name">Attack<div className="PokeInfo-container-stats-stat-name-value"> {pkmnInfo.attack}</div></div>
                            <div className="PokeInfo-container-stats-stat-value">
                                <div
                                className='PokeInfo-container-stats-stat-value-bar'
                                    style={{
                                        width: `${(pkmnInfo.widthAttack/255)*100}%`,
                                        backgroundColor: handleColor(pkmnInfo.attack)
                                    }}>a</div>
                            </div>
                        </li>

                        <li className='PokeInfo-container-stats-stat'>
                            <div className="PokeInfo-container-stats-stat-name">Defense <div className="PokeInfo-container-stats-stat-name-value">{pkmnInfo.defense}</div></div>
                            <div className="PokeInfo-container-stats-stat-value">
                                <div
                                className='PokeInfo-container-stats-stat-value-bar'
                                    style={{
                                        width: `${(pkmnInfo.widthDefense / 255) * 100}%`,
                                        backgroundColor: handleColor(pkmnInfo.defense)
                                    }}>a</div>
                            </div>
                        </li>

                        <li className='PokeInfo-container-stats-stat'>
                            <div className="PokeInfo-container-stats-stat-name">Sp. Attack <div className="PokeInfo-container-stats-stat-name-value">{pkmnInfo.spAttack}</div></div>
                            <div className="PokeInfo-container-stats-stat-value">
                                <div
                                className='PokeInfo-container-stats-stat-value-bar'
                                    style={{
                                        width: `${(pkmnInfo.widthSpAttack / 255) * 100}%`,
                                        backgroundColor: handleColor(pkmnInfo.spAttack)
                                    }}>a</div>
                            </div>
                        </li>

                        <li className='PokeInfo-container-stats-stat'>
                            <div className="PokeInfo-container-stats-stat-name">Sp. Defense <div className="PokeInfo-container-stats-stat-name-value">{pkmnInfo.spDefense}</div></div>
                            <div className="PokeInfo-container-stats-stat-value">
                                <div
                                    className='PokeInfo-container-stats-stat-value-bar'
                                    style={{
                                        width: `${(pkmnInfo.widthSpDefense / 255) * 100}%`,
                                        backgroundColor: handleColor(pkmnInfo.spDefense)
                                    }}>a</div>
                            </div>
                        </li>

                        <li className='PokeInfo-container-stats-stat'>
                            <div className="PokeInfo-container-stats-stat-name">Speed <div className="PokeInfo-container-stats-stat-name-value">{pkmnInfo.speed}</div></div>
                            <div className="PokeInfo-container-stats-stat-value">
                                <div
                                className='PokeInfo-container-stats-stat-value-bar'
                                    style={{
                                        width: `${(pkmnInfo.widthSpeed / 255) * 100}%`,
                                        backgroundColor: handleColor(pkmnInfo.speed)
                                    }}>a</div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="PokeInfo-container-empty">
                    <img src="../assets/pokemonLogo.png" alt="" />
                    Hello Trainer! Write in the search bar above the name of a Pokémon and it will appear here!
                </div>
            </div>

            <div className="Copyright">
                Made By - Felipe Cassiano <br />
                <a href="https://github.com/Felipe-Cassiano">https://github.com/Felipe-Cassiano</a>
            </div>
        </section>
    )
}

export default Body