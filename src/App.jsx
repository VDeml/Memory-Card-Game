import { useState } from "react";
import './App.css'


  async function newCall(fetchValue) {
    try {
      const response = await fetch(fetchValue)
      const pokemonData = await response.json()
      return pokemonData
    } catch(error) {
      console.error(error)
    }
  };

  const firstCard = await newCall("https://pokeapi.co/api/v2/pokemon/ditto")
  const secondCard = await newCall("https://pokeapi.co/api/v2/pokemon/machamp")
  const cardsArray = [];
  cardsArray.push(firstCard)
  cardsArray.push(secondCard)
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/torchic"))
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/combusken"))
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/blaziken"))
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/treecko"))
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/grovyle"))
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/sceptile"))

function Card({ pokemonName, spriteUrl, onClick, id}) {
  return (
    <button className="card" onClick={() => onClick(id)}>
      <h2>{pokemonName}</h2>
      <img src={spriteUrl}></img>
    </button>
  )
}


export default function App() {
  const numberOfCardsDisplayed = 2;
  const [displayed, setDisplayed] = useState(shuffleDisplay(cardsArray).slice(0, numberOfCardsDisplayed))
  const [alreadyClicked, setAlreadyClicked] = useState([])
  const [highscore, setHighscore] = useState(0);

  function shuffleDisplay(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  function handleCardClick(id) {
    const shuffledCopy = shuffleDisplay(cardsArray)
    setDisplayed(shuffledCopy.slice(0, numberOfCardsDisplayed))
    if(alreadyClicked.includes(id)) {
      alert("Game over!")
      setAlreadyClicked([])
      if(alreadyClicked.length > highscore) setHighscore(alreadyClicked.length)
    } else setAlreadyClicked([...alreadyClicked, id])
    
    
  } 

  
  return (
    <>
      <h1>Game grid below?</h1>
      <h2>Score: {alreadyClicked.length}</h2>
      <h2>Highscore: {highscore}</h2>
      <div className="gameGrid">
        {displayed.map(card => 
          <Card 
          key={card.id}
          id={card.id}
          pokemonName={card.name}
          spriteUrl={card.sprites.versions["generation-iii"]["emerald"].front_default}
          onClick={handleCardClick}
          />
        )}
      </div>
      
    </>
    
    
  );
}
