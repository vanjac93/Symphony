import React, { Component, useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch, useLocation } from 'react-router-dom'
import { Routes } from '~/Constants'
import ErrorPage from './ErrorPage'
import Influencers from './Influencers'
import Register from './Register'
import News from './News'
import UserContext from './common/UserContext'
import usersApi from '~/services/user'
import { FOLLOWINGS_LIMIT } from '../Constants'

function PrivateRoute({ component, authed, ...rest }) {
  const location = useLocation()
  const finalComponent = authed ? component : <Redirect to={{
    pathname: '/login',
    state: { from: location.pathname }
  }} />

  console.log('finalComponent',finalComponent)
  return (
    <Route
      {...rest}
      component={finalComponent}
    />
  )
}

const RouterComponent = () => {
  const persistedUser = localStorage.getItem('user')
  const [user, setUser] = useState(persistedUser ? JSON.parse(persistedUser) : null )
  const hasUser = Boolean(user)
  const [hasSelectedInfluencers, setHasSelectedInfluencers] = useState(user ? user.hasSelectedFollowers : false)

  useEffect(() => {
    if(user && !user.isInfluencer) {
      setHasSelectedInfluencers(user.numberOfFollowings>=FOLLOWINGS_LIMIT)
    }
  }, [user])

  const handleSetUser = useCallback(async (newUser) => {
    if(newUser) {
      const user = newUser.user ? newUser.user : newUser
      const {token} = newUser
      if(token) {
        localStorage.setItem('token', token)
      }
      if(user.numberOfFollowings >= 4) {
        const [data,err,resp] = await usersApi.updateUser(user)
      }
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      setUser(null)
    }
  }, [])

  return (
    <UserContext.Provider value={{user, setUser: handleSetUser}}>
      <Router>
        <Switch>
          <Route exact path={[Routes.REGISTER,Routes.LOGIN]} component={Register} />
          <Route exact path={Routes.HOME} authed={hasUser}
            render={props => hasUser ? user.isInfluencer ?  <News {...props} /> : hasSelectedInfluencers ?  <News {...props} /> :
              <Redirect to={{pathname: Routes.INFLUENCERS_LIST, state: {from: Routes.HOME}} } />
              :
              <Redirect to={{pathname: Routes.INFLUENCERS_LIST, state: {from: Routes.HOME}} } />
            }
          />
          <Route exact path={Routes.INFLUENCERS_LIST} authed={hasUser}
            render={props => hasUser ? user.isInfluencer ?  <News {...props} /> : hasSelectedInfluencers ?  <News {...props} /> :
              <Redirect to={{pathname: Routes.LOGIN, state: {from: Routes.HOME}} } />
              :
              <Redirect to={{pathname: Routes.LOGIN, state: {from: Routes.HOME}} } />
            }  />
          <Route exact path={Routes.ERROR_PAGE} authed={hasUser} component={ErrorPage}  />
          <Route exact path="*" render={() => <Redirect to={Routes.ERROR_PAGE} />} />
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}

export default RouterComponent
