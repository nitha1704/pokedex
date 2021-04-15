import React, {useState, useEffect, useContext} from "react";
import styled from 'styled-components';

// Context
import {PokedexContext} from '../context/PokedexContext';
// Component
import PokemonCard from './PokemonCard';
import Pagination from './Pagination';
// Loading Image
import loadingIMG from "../images/loading-img/loading1.gif";

const PokemonList = () => {

  const {loading, pokemon, pokemonFilter} = useContext(PokedexContext);

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
    img {
        display:block;
        margin:0 auto;
    }
`
const WrapPokemonList = styled.div`
    text-align: center;
`
export default PokemonList;
