import React, {useState, useEffect, useContext} from "react";
import styled from 'styled-components';

// Context
import {PokedexContext} from '../context/PokedexContext';
// Component
import PokemonCard from './PokemonCard';
// Loading Image
import loadingIMG from "../images/loading-img/loading2.gif";

const PokemonList = () => {

  const {loading, pokemonFilter} = useContext(PokedexContext);

  if(loading) {
      return <WrapLoadingImage>
          <img src={loadingIMG} />
      </WrapLoadingImage>;
  }
  return (
    <WrapPokemonList className="wrap-pokemon-list">   
        <PokemonCard pokemonFilter={pokemonFilter} />
    </WrapPokemonList>
  );
};

const WrapLoadingImage = styled.div`
  position: relative;
  top: 5vw;
  img {
    display: block;
    margin: 0 auto;
  }
`;
const WrapPokemonList = styled.div`
    text-align: center;
`
export default PokemonList;
