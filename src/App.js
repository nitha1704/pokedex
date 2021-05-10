import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// CSS
import "./css/style.css";
import "./css/mobile-responsive.css";

// Plugins
import "./plugins/bootstrap/bootstrap.min.css";

// Pages
import Home from './pages/Home';
import PokemonInfo from './component/PokemonInfo';
import ErrorPage from './pages/ErrorPage';

const App = () => {

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/pokemon/:id([1-9]|[1-9][0-9]|[1-7][0-9]{2}|8[0-8][0-9]|89[0-8])"
            // Limit Pokemon Number 1-898
            component={PokemonInfo}
          />
          <Route exact path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App
