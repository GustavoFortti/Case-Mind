import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import LogIn from '../pages/LogIn/index'
import Register from '../pages/Register/index'

const Routes = () => { 
    const history = useHistory()
    return (
        <BrowserRouter history={`${history}`}>
            <Switch>
                <Route component={LogIn} exact path="/"/>
                <Route component={Register} exact path="/register"/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;