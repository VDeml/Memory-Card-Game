
  async function newCall(fetchValue) {
    try {
      const response = await fetch(fetchValue)
      const pokemonData = await response.json()
      return pokemonData
    } catch(error) {
      console.error(error)
    }
  };

  export const cardsArray = [];
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/ditto"))
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/gengar"))
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/torchic"))
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/combusken"))
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/blaziken"))
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/treecko"))
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/grovyle"))
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/sceptile"))
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/mudkip"))
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/marshtomp"))
  cardsArray.push(await newCall("https://pokeapi.co/api/v2/pokemon/swampert"))
