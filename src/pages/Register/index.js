import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import {Container} from './index.styled'
import registerImage from '../../../public/assets/images/register.jpeg'
import bigLogo from '../../../public/assets/images/big-logo.svg'
import userApi from '~/services/user'
import { Dimmer, Divider, Form, Icon, Input, Message } from 'semantic-ui-react'
import { Controller, useForm } from 'react-hook-form'
import {usernameRegex} from '~/Constants'
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { Routes } from '../../Constants'
import UserContext from '../common/UserContext'


export default function Register() {
  const {handleSubmit, control, errors} = useForm()
  const history = useHistory()
  const location = useLocation()
  const match = useRouteMatch()
  const {setUser} = useContext(UserContext)
  const [data, setData] = useState({
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      username: '',
      dateOfBirth: ''
    },
    loading: false,
    isInfluencer: false,
    isSignedUp: false,
    isLogin: match.path === Routes.LOGIN ? true : false
  })

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      isLogin: match.path === Routes.LOGIN ? true : false
    }))
  }, [match.path])

  const onSubmit = async (formData) => {
    if(data.isLogin) {
      console.log('location',location)
      setData(prevData => ({...prevData, loading: true}))
      const [data,error] = await userApi.login(formData.username,formData.password)
      setData(prevData => ({...prevData, loading: false}))
      if(!error.length) {
        setUser(data)
        console.log('uslo')
        history.push(location.state && location.state.from ?  location.state.from : '')
        return
      } else {
        setData(prevData => ({...prevData, errorMessage: error[0]}))
      }
      return
    }
    if(data.isSignedUp) {
      setData(prevData => ({...prevData, loading: true}))
      const [data,error] = await userApi.login(formData.username, formData.password)
      console.log('signed up', data)
      if(!error.length) {
        setUser(data)
        if(data.user.isInfluencer) {
          history.push(Routes.NEWS)
        } else {
          history.push(Routes.INFLUENCERS_LIST)
        }
      } else {
        setData(prevData => ({...prevData, loading: false, errorMessage: error[0]}))
      }
    } else {
      setData(prevData => ({...prevData, loading: true}))
      const [data] = await userApi.signUp(formData)
      const {password, ...user} = formData
      setData(prevData => ({...prevData, loading: false, user, isInfluencer: data.isInfluencer, isSignedUp: true}))
    }
  }

  function renderLogin() {
    return (
      <Fragment>
        <Form.Field>
          <h4>Sign in</h4>
        </Form.Field>
        <Form.Field>
          <label>Username or email</label>
          <Controller rules={{required: true}} control={control} defaultValue={data.user.username} name="username" as={Input} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Controller rules={{required: true}} control={control} defaultValue={data.user.username} name="password" as={Input} />
        </Form.Field>
      </Fragment>
    )
  }

  function renderSignedUp() {
    return (
      <Fragment>
        <Form.Field>
          <h3>tadaaaa <br/> Your role is <b>{data.isInfluencer ? 'influencer' : 'regular'}!</b>
          </h3>
        </Form.Field>
        <Divider />
        <Form.Field>
          <h4>Sign in</h4>
        </Form.Field>
        <Form.Field>
          <label>Username or email</label>
          <Controller rules={{required: true}} control={control} defaultValue={data.user.username} name="username" as={Input} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Controller rules={{required: true}} control={control} defaultValue={data.user.username} name="password" as={Input} />
        </Form.Field>
      </Fragment>
    )
  }

  function renderSignUp() {
    return <Fragment>
      <Form.Field>
        <h3>Create an account</h3>
      </Form.Field>
      <Form.Group widths="equal">
        <Form.Field error={errors.firstName ? true : false}>
          <label>First name</label>
          <Controller defaultValue="" rules={{required: true}} as={Input}
            control={control} name="firstName" placeholder="First name" />
          {errors.firstName && <span>required</span>}
        </Form.Field>
        <Form.Field error={errors.lastName ? true: false}>
          <label>Last name</label>
          <Controller defaultValue="" name="lastName"
            rules={{required: true}} as={Input} control={control} />
        </Form.Field>
      </Form.Group>
      <Form.Field error={errors.email ? true : false}>
        <label>Email</label>
        <Controller defaultValue="" name="email"
          rules={{required: true}} as={Input} control={control} />
        {errors.email && <span>required</span>}
      </Form.Field>
      <Form.Field>
        <label>Username</label>
        <Controller defaultValue="" name="username"
          rules={{required: true, pattern: usernameRegex}} as={Input}
          control={control} />
        {errors.username && <span>required</span>}
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <Controller defaultValue="" name="password"
          rules={{required: true}} as={<Input type="password" />}
          control={control} />
        {errors.password && <span>required</span>}
      </Form.Field>
      <Form.Field>
        <label>Date</label>
        <Controller defaultValue="" name="dateOfBirth"
          rules={{required: true}} as={Input} control={control} />
      </Form.Field>
    </Fragment>
  }

  function renderContent() {
    if(data.isLogin) {
      return renderLogin()
    }
    if(data.isSignedUp) {
      return renderSignedUp()
    }
    return renderSignUp()
  }

  function renderForm() {
    return ( <Fragment>
      <Form error={data.errorMessage ? true : false} onSubmit={handleSubmit(onSubmit)}>
        {
          renderContent()
        }
        <Message icon error >
          <Icon name="warning" size="small" />
          {data.errorMessage}
        </Message>
        <Form.Button loading={data.loading} fluid className="submit"
          type="submit" content={data.isLogin ? 'Sign in' : 'Get started'} />
        {data.isLogin && (
          <Fragment>
            <Divider />
            <Form.Field>
          Don&apos;t have an account? <Link to={Routes.REGISTER}>Create account.</Link>
            </Form.Field>
          </Fragment>
        )
        }
      </Form>
    </Fragment>)
  }

  return (
    <Container>
      <div className="img-container">
        <h2>
                        A simple social network. <br />
                        Random as well.
        </h2>
        <img src={registerImage} />
      </div>
      <div className="form-container">
        <div className="content">
          <div className="logo">
            <img src={bigLogo} />
          </div>
          {renderForm()}
        </div>
      </div>
    </Container>
  )
}
