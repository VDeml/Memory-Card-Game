import { useState } from "react";
import { cardsArray } from './data.js'
import './App.css'



function Card({ pokemonName, spriteUrl, onClick, id}) {
  return (
    <button className="card" onClick={() => onClick(id)}>
      <h2>{pokemonName}</h2>
      <img src={spriteUrl}></img>
    </button>
  )
}


export default function App() {
  //MAGIC NUMBER dictates how many pokemon are shown to choose from
  const numberOfCardsDisplayed = 4;
  const [displayed, setDisplayed] = useState(shuffleArray(cardsArray).slice(0, numberOfCardsDisplayed))
  const [alreadyClicked, setAlreadyClicked] = useState([])
  const [highscore, setHighscore] = useState(0);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  

  function handleCardClick(id) {
    if(alreadyClicked.includes(id)) {
      alert("Game over!")
      setAlreadyClicked([])
      setDisplayed(shuffleArray(cardsArray).slice(0, numberOfCardsDisplayed))
      if(alreadyClicked.length > highscore) setHighscore(alreadyClicked.length)
    } else if(alreadyClicked.length === (cardsArray.length - 1)) {
        alert("Game Won!")
        setHighscore(cardsArray.length)
        setDisplayed(shuffleArray(cardsArray).slice(0, numberOfCardsDisplayed))
        setAlreadyClicked([])
    } else {
      // create a new array of all of the clicked cards for calculating the new states
      const newAlreadyClicked = [...alreadyClicked, id]
      setAlreadyClicked(newAlreadyClicked)
      console.log(newAlreadyClicked)

      const shuffledUnClickedCards = shuffleArray(cardsArray.filter(card => !newAlreadyClicked.includes(card.id)))
      const shuffledArray = shuffleArray(cardsArray)
      // any cards, leaving one space to guarantee atleast one unclicked card will be displayed
      const readyForShip = [shuffledUnClickedCards[0]]
      let iteration = 0;
      while(readyForShip.length < numberOfCardsDisplayed) {
        if(!readyForShip.includes(shuffledArray[iteration])) {
          readyForShip.push(shuffledArray[iteration])
        }
        iteration++
      }
      setDisplayed(shuffleArray(readyForShip))
    }
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
          spriteUrl={card.sprites.versions["generation-ix"]["scarlet-violet"].front_default}
          onClick={handleCardClick}
          />
        )}
      </div>
      
    </>
    
    
  );
}
