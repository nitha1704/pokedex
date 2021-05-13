import React from "react";

// Pages
import SearchBar from "../component/SearchBar";
import PokemonList from "../component/PokemonList";


const Home = () => {
  return (
    <section className="home-section">
      <h1 className="pokemon-header-title">Pokedex Change Machine</h1>
      <div className="pokemon-container">
        <SearchBar />
        <PokemonList />
      </div>

    </section>
  );
};




export default Home;
