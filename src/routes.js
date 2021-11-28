import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/layout';
import Login from './pages/Login';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/admin" render={(props) => <Layout {...props} />} />
                <Redirect from="/" to="/login" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
