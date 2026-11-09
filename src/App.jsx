//import { useState, useEffect } from "react";
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

function Card({ pokemonName, spriteUrl}) {
  return (
    <div className="card">
      <h2>{pokemonName}</h2>
      <img src={spriteUrl}></img>
    </div>
  )
}


export default function App() {
  return (
    <>
      <h1>Game grid below?</h1>
      <div className="gameGrid">
        <Card 
        pokemonName={firstCard.name}
        spriteUrl={firstCard.sprites.versions["generation-viii"]["sword-shield"].front_default}
        />

        <Card 
        pokemonName={secondCard.name}
        spriteUrl={secondCard.sprites.versions["generation-viii"]["sword-shield"].front_default}
        />
        {cardsArray.map(card => 
          <Card 
          key={card.id}
          pokemonName={card.name}
          spriteUrl={card.sprites.versions["generation-iii"]["emerald"].front_default}
          />
        )}
      </div>
      
    </>
    
    
  );
}
