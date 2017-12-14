import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

// Components
import { Home } from './components/home/home';
import { BaseRandomVariablesCharacteristics } from './components/base-random-variables-characteristics/base-random-variables-characteristics'
import { InverseFunctionMethod } from './components/inverse-function-method/inverse-function-method';
import { DiscreteRandomValues } from './components/discrete-random-values/discrete-random-values';

import './App.css';

const App = () => (
  <div className="App">
    <Router>
      <div>
        <ul className="header">
          <li><Link href to="/">Главная</Link></li>
          <li><Link href to="/lab1">ЛАБОРАТОРНАЯ РАБОТА 1</Link></li>
          <li><Link href to="/lab2">ЛАБОРАТОРНАЯ РАБОТА 2</Link></li>
          <li><Link href to="/lab3">ЛАБОРАТОРНАЯ РАБОТА 3</Link></li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/lab1" component={BaseRandomVariablesCharacteristics} />
        <Route path="/lab2" component={InverseFunctionMethod} />
        <Route path="/lab3" component={DiscreteRandomValues} />
      </div>
    </Router>
  </div>
);

export default App;
