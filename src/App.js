import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// CSS
import "./css/style.css";
import "./css/responsive.css";

// Plugins
import "./plugins/bootstrap/bootstrap.min.css";

// Pages
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage'

const App = () => {

  return (
    <div className="app">
      <div className="pokemon-container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="*" component={ErrorPage} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App
