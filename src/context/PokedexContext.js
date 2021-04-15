import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const PokedexContext = createContext();
const GlobalContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);
  const [pokemonFilter, setPokemonFilter] = useState([]);
  const [pokemonSearchData, setPokemonSearchData] = useState([]);
  const [pokemonEndPoint, setPokemonEndPoint] = useState(12);

  const getData = async () => {
    setLoading(true);
    const pokemonData = await axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=898")
      .then((res) => res.data)
      .catch((err) => console.log(err));

    const pokemonDataForFilter = await axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=898")
      .then((res) => res.data)
      .catch((err) => console.log(err));

    const pokemonDataForSearch = await axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=898")
      .then((res) => res.data)
      .catch((err) => console.log(err));

    const getPokemonSearchData = pokemonDataForSearch.results.map(
      (value, index) => {
        return axios.get(value.url).then((res) => res.data);
      }
    );

    const getPokemonDataForSearch = Promise.all(getPokemonSearchData)
      .then((data) => data.map((value) => value))
      .then((data2) => setPokemonSearchData(data2));

    setPokemon(pokemonData.results);
    setPokemonFilter(pokemonData.results);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <PokedexContext.Provider
      value={{
        loading,
        setLoading,
        pokemon,
        setPokemon,
        pokemonSearchData,
        setPokemonSearchData,
        pokemonFilter,
        setPokemonFilter,
        pokemonEndPoint,
        setPokemonEndPoint,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};

export { PokedexContext, GlobalContext };
