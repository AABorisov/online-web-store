import React from 'react';
import { Switch, Route } from 'react-router-dom';

import OnlineWebStore from './pages/online-web-store';

const Router = () => (
    <Switch>
        <Route exact path = '/' component={OnlineWebStore}/>
    </Switch>
);

export default Router;