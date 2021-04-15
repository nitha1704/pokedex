import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { PokedexContext } from "../context/PokedexContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../node_modules/react-lazy-load-image-component/src/effects/blur.css";

// Background
import PokemonCardBackground from "../images/pokemon_card_bg.png";
// Loading Image
import loadingIMG from "../images/loading-img/loading2-small.gif";

const PokemonCard = ({ pokemonFilter }) => {
  const { pokemonEndPoint, setPokemonEndPoint } = useContext(PokedexContext);
  const [pokemonChildrenLength, setWrapPokemonChildrenLength] = useState(0);
  const handleFirstRender = useRef(true);
  const wrapPokemonItem = useRef(null);

  const handleLoadingMore = () => {
    setPokemonEndPoint(pokemonEndPoint + 12);
  };

  useEffect(() => {
    if (handleFirstRender.current === true) {
      handleFirstRender.current = false;
    } else {
      if (pokemonFilter.length > 0) {
        setWrapPokemonChildrenLength(wrapPokemonItem.current.children.length);
      }
      if (wrapPokemonItem.current.children.length > 12) {
        setTimeout(() => {
          const elemTop =
            wrapPokemonItem.current.children[
              wrapPokemonItem.current.children.length - 12
            ].offsetTop;
          window.scroll({ top: elemTop, behavior: "smooth" });
        }, 300);
      }
    }
  });

  if (pokemonFilter.length === 0) {
    return (
      <NotFoundPokemon>
        <div className="wrap-notfound-pokemon">
          <h2>No Pokemon Match Your Search</h2>
        </div>
      </NotFoundPokemon>
    );
  }
  return (
    <>
      <div className="row" ref={wrapPokemonItem}>
        {pokemonFilter.slice(0, pokemonEndPoint).map((value, index) => {
          const regExp = /\/(\d+)\//;
          const pokemonNumber = regExp.exec(value.url);
          const pokemonImage = `https://pokeres.bastionbot.org/images/pokemon/${pokemonNumber[1]}.png`;
          const firstCharUpperCaseName = value.name
            .split(" ")
            .map((char) => {
              return char.charAt(0).toUpperCase() + char.substring(1);
            })
            .join("");
          const errorIMG = `./public_images/pokemon-notfound/poke${pokemonNumber[1]}.png`;
          return (
            <PokeCard key={pokemonNumber[1]} className="col-3">
              <div className="wrap-pokecard">
                <LazyLoadImage
                  src={pokemonImage}
                  className="pokemon-image"
                  placeholderSrc={loadingIMG}
                  effect="blur"
                  onError={(event) => (event.target.src = errorIMG)}
                />
                <div className="wrap-name">
                  <h4>{pokemonNumber[1]}</h4>
                  <h3>{firstCharUpperCaseName}</h3>
                </div>
              </div>
            </PokeCard>
          );
        })}
      </div>

      <LoadingMore>
        <div className="wrap-button">
          {handleFirstRender.current == false &&
          pokemonChildrenLength >= pokemonFilter.length ? (
            <button className="no-more-item">No More Item</button>
          ) : (
            <button
              className="loading-more"
              onClick={() => handleLoadingMore()}
            >
              Loading More...
            </button>
          )}
        </div>
      </LoadingMore>
    </>
  );
};

const PokeCard = styled.div`
  .wrap-pokecard {
    position: relative;
    background-image: url(${PokemonCardBackground});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 500px;
    margin-bottom: 30px;
  }
  .wrap-name {
    position: absolute;
  }
  .pokemon-image {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    height: 140px;
    width: 140px;
  }
  span.lazy-load-image-background {
    position: absolute;
    width: 240px;
    height: 230px;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
  }
  .lazy-load-image-background.blur {
    filter: blur(0.1px) !important;
  }
`;

const NotFoundPokemon = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  .wrap-notfound-pokemon {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 50px;
    background: #0a141e;
    border: 2px solid #466e9b;
    border-radius: 20px;
  }

  h2 {
    letter-spacing: 1px;
  }
`;

const LoadingMore = styled.div`
  margin-top: 30px;
  button.no-more-item {
    color: #fff;
    font-size: 22px;
    letter-spacing: 1px;
    background: gray;
    padding: 10px 20px;
    border: 2px solid gray;
    border-radius: 50px;
    outline: none;
    cursor: no-drop;
  }
  button.loading-more {
    color: #fff;
    font-size: 22px;
    letter-spacing: 1px;
    background: transparent;
    padding: 10px 20px;
    border: 2px solid #436a96;
    border-radius: 50px;
    outline: none;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: #000;
    }
  }
`;

export default PokemonCard;
