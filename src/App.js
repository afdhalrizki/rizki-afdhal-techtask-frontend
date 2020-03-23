import React from 'react';
import './App.css';

import Nav from './Nav';
import About from './About';
import Ingredients from './Ingredients';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/* Home Component */
const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
)

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/ingredients" component={Ingredients} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
