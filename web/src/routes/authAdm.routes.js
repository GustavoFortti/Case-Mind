import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import HomeAdm from '../pages/HomeAdm/index'
import EditUser from '../pages/EditUser/index'

const Routes = () => { 
    const history = useHistory()
    return (
        <BrowserRouter history={`${history}`}>
            <Switch>
                <Route component={HomeAdm} exact path="/user/adm"/>
                <Route component={EditUser} exact path="/user/update"/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;