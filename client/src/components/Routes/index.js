import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import Game from '../../pages/Game';
import Profil from '../../pages/Profil';
import Ranking from '../../pages/Ranking';
import Team from '../../pages/Team';

const index = () => {
    return (
    <Router>
        <Switch>
            <Route path="/" exact component={ Home } />
            <Route path="/game" exact component={ Game } />
            <Route path="/profil" exact component={ Profil } />
            <Route path="/ranking" exact component={ Ranking } />
            <Route path="/team" exact component={ Team } />
            <Redirect to="/" />
        </Switch>
    </Router>
    );
};

export default index;