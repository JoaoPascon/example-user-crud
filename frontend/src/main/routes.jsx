import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/home'
import UserCrud from '../components/user/userCrud'
import About from '../components/templates/about'
import Logs from '../components/templates/logs'

export default props =>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/users' component={UserCrud}/>
        <Route path='/logs' component={Logs}/>
        <Route path='/about' component={About}/>
        <Redirect from='*' to='/'/>
    </Switch> 