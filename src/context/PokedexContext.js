import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const PokedexContext = createContext();
const GlobalContext = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonEndPoint, setPokemonEndPoint] = useState(12);

  // Pokemon Data
  const [pokemon, setPokemon] = useState([]);
  const [pokemonFilter, setPokemonFilter] = useState([]);
  const [pokemonSearchData, setPokemonSearchData] = useState([]);

  // Single Page Pokemon Data
  const [pokemonInformation1, setPokemonInformation1] = useState([]);
  const [pokemonInformation2, setPokemonInformation2] = useState([]);

  // Scroll Top Position
  const [scrollTopPosition, setScrollTopPosition] = useState(0);

  // Types Color
  const typesColor = {
    grass: "#66f609",
    fire: "#fb0b0a",
    water: "#35aef5",
    normal: "#cbc8a9",
    flying: "#075663",
    bug: "#90b92d",
    poison: "#60127f",
    electric: "#fef923",
    ground: "#beab20",
    fighting: "#7f0a10",
    psychic: "#890431",
    rock: "#93824e",
    ice: "#65d0e4",
    ghost: "#462a52",
    dragon: "#8954fc",
    dark: "#2c211b",
    steel: "#bac4c3",
    fairy: "#fe9fc1",
  };

  const pokemonIndexNumber = [];
  for (let i = 1; i <= 100; i++) {
    pokemonIndexNumber.push(i);
  }

  const getData = async () => {
    setLoading(true);

    const q1 = await Promise.all(
      pokemonIndexNumber.map((item) => {
        return axios
          .get(`https://pokeapi.co/api/v2/pokemon/${item}/`)
          .then((res) => res.data);
      })
    ).then((res2) => res2);

    const q2 = await Promise.all(
      pokemonIndexNumber.map((item) => {
        return axios
          .get(`https://pokeapi.co/api/v2/pokemon-species/${item}/`)
          .then((res) => res.data);
      })
    ).then((res2) => res2);
      // console.log(q1, q2)

    // const q3 = pokemonIndexNumber.map((item)=>{
    //   return axios.all([
    //     axios.get(`https://pokeapi.co/api/v2/pokemon/${item}/`),
    //     axios.get(`https://pokeapi.co/api/v2/pokemon-species/${item}/`),
    //   ]).then(res => Promise.all(res).then(res2=>console.log(res2)))
    // })
    // console.log(q3)

    // Single Page Pokemon Information
    const pokemonInfo1 = Array.isArray(q1)
      ? q1.map((item) => {
          return {
            id: item.id,
            name: item.name,
            height: {
              decimetres: item.height,
              centimeter: item.height * 10,
              feet: Number(item.height * 0.328084).toFixed(2),
            },
            weight: {
              killogram: Math.round(item.weight * 0.1),
              pound: Number(item.weight * 0.220462).toFixed(2),
            },
            stat: item.stats.reduce((acc, total) => {
              if (!acc[total.stat.name]) {
                acc[total.stat.name] = total.base_stat;
              }
              return acc;
            }, {}),
            abilities: item.abilities
              .map(({ ability }) => {
                return (
                  ability.name.charAt(0).toUpperCase() +
                  ability.name.substring(1)
                );
              })
              .join(", "),
            EVs: item.stats
              .filter((stat) => {
                return stat.effort > 0;
              })
              .map((item) => {
                return `${item.effort} ${item.stat.name
                  .split(" ")
                  .map((char) => {
                    return char.charAt(0).toUpperCase() + char.substring(1);
                  })}`;
              })
              .join(", "),
            type: item.types.map(({ type }) => {
              return type.name.charAt(0).toUpperCase() + type.name.substring(1);
            }),
          };
        })
      : null;

    const pokemonInfo2 = Array.isArray(q2)
      ? q2.map((item) => {
          return {
            id: item.id,
            name: item.name,
            captureRate: Math.round((100 / 255) * item.capture_rate), //convert to percentage
            genderRatio: {
              originalRate: item.gender_rate,
              femaleRate: item.gender_rate * 12.5,
              maleRate: (8 - item.gender_rate) * 12.5,
            },
            eggGroups: item.egg_groups.map(({ name }) => {
              return name.charAt(0).toUpperCase() + name.substring(1);
            }),
            hatchSteps: 255 * (item.hatch_counter + 1),
            description: item.flavor_text_entries.filter((flavor) => {
              if (flavor.language.name === "en") {
                return flavor.flavor_text;
              }
            }),
          };
        })
      : null;

    if (pokemonInfo1 && pokemonInfo2) {
      // Pokemon Global Data
      setPokemon(q1);
      setPokemonFilter(q1);
      setPokemonSearchData(q1);
      // Pokemon Single Page Data
      setPokemonInformation1(pokemonInfo1);
      setPokemonInformation2(pokemonInfo2);
    } else {
      setPokemonFilter(undefined);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <PokedexContext.Provider
      value={{
        getData,
        loading,
        setLoading,
        pokemon,
        setPokemon,
        pokemonSearchData,
        setPokemonSearchData,
        pokemonName,
        setPokemonName,
        pokemonFilter,
        setPokemonFilter,
        pokemonEndPoint,
        setPokemonEndPoint,

        // Pokemon Single Page Data
        pokemonInformation1,
        pokemonInformation2,

        // Types Color
        typesColor,

        // Scroll Top Position
        scrollTopPosition,
        setScrollTopPosition,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};

export { PokedexContext, GlobalContext };
