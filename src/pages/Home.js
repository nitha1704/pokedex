import React from "react";
import styled from 'styled-components';

// Pages
import SearchBar from "../component/SearchBar";
import PokemonList from "../component/PokemonList";

// Image
import TitleBackground from "../images/pokedex_title_bg.png";

const Home = () => {
  return (
    <section className="home-section">
      <Title>
        <h1>PokeDex Api</h1>
      </Title>
      <SearchBar />
      <PokemonList />
    </section>
  );
};

const Title = styled.div`
  background: url(${TitleBackground});
  background-position: center;
  text-align: center;
  h1 {
    color: #000;
  }
`;

export default Home;
