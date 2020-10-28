import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import HomeDefault from '../pages/HomeDefault/index'
import EditUser from '../pages/EditUser/index'

const Routes = () => { 
    const history = useHistory()
    return (
        <BrowserRouter history={`${history}`}>
            <Switch>
                <Route component={HomeDefault} exact path="/user/default"/>
                <Route component={EditUser} exact path="/user/update"/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;