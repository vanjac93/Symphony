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
  return (
    <Route
      {...rest}
      component={component}
    />
  )
}

const RouterComponent = () => {
  const persistedUser = localStorage.getItem('user')
  const [user, setUser] = useState(persistedUser ? JSON.parse(persistedUser) : null )
  const hasUser = Boolean(user)
  const [hasSelectedInfluencers, setHasSelectedInfluencers] = useState(user ? user.hasSelectedFollowers : false)

  useEffect(() => {
    if(user) {
      if(user.isInfluencer) {
        setHasSelectedInfluencers(true)
      } else {
        setHasSelectedInfluencers(user.numberOfFollowings>FOLLOWINGS_LIMIT)
      }
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
          <Route exact path={[Routes.REGISTER,Routes.LOGIN]} component={props => hasUser ? <Register {...props} /> : <Register {...props}/>} />
          <PrivateRoute exact path={Routes.HOME} authed={hasUser} component={News} />
          <PrivateRoute exact path={Routes.INFLUENCERS_LIST} authed={hasUser} component={Influencers} />
          <Route exact path={Routes.ERROR_PAGE} authed={hasUser} component={ErrorPage}  />
          <Route exact path="*" render={() => <Redirect to={Routes.ERROR_PAGE} />} />
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}

export default RouterComponent
