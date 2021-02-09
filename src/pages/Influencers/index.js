import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import {HeaderDiv, InfluencerCard, Container, ListContainer} from './index.styled'
import UserContext from '~/pages/common/UserContext'
import followingsApi from '~/services/followings'
import influencersApi from '~/services/influencers'
import logo from 'assets/images/logo-horizontal-small.svg'
import { Dimmer, Loader } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { FOLLOWINGS_LIMIT, Routes } from '~/Constants'


export default function Influencers() {
  const {user, setUser} = useContext(UserContext)
  const [page, setPage] = useState(1)
  const [busy, setBusy] = useState(false)
  const history = useHistory()
  const [followings, setFollowings] = useState({
    count: 0,
    results: []
  })
  const [influencers, setInfluencers] = useState({
    count: 0,
    results: []
  })

  const [count, setCount] = useState(followings.results)

  useEffect(() => {
    setCount(followings.length)

  }, [followings])

  useEffect(() => {
    if(user && user.numberOfFollowings>=FOLLOWINGS_LIMIT) {
      history.replace(Routes.HOME)
    }
  }, [user])

  useEffect(() => {
    const fetchData = async () => {
      Promise.all([
        influencersApi.getInfluencers(page),
        followingsApi.getFollowings(user.username)
      ])
        .then(([influencersData, followingsData]) => {
          if(!influencersData[2].ok || !followingsData[2].ok) {
            return
          }
          setInfluencers(influencersData[0])
          setFollowings(followingsData[0])
        })
    }

    fetchData()
  }, [])


  const handleNext = () => {

  }

  const toggleFollow = useCallback(id => async () => {
    if(!user) {
      return <div />
    }
    setBusy(true)
    const existing = followings.find(inf => inf.id === id)
    let numberOfFollowings
    if(existing) {
      const [data,err,response] = await influencersApi.unfollow(id)
      numberOfFollowings = user.numberOfFollowings -1
      setUser({
        ...user,
        numberOfFollowings,
        hasSelectedInfluencers: user.numberOfFollowings > 3
      })
    } else {
      const [data,err,response] = await influencersApi.follow(id)
      const numberOfFollowings = user.numberOfFollowings +1
      setUser({
        ...user,
        numberOfFollowings,
        hasSelectedInfluencers: user.numberOfFollowings > 3
      })
    }
    setBusy(false)
  }, [influencers, followings, user])

  if(!user) {
    return
  }

  return (
    <Container>
      <Dimmer inverted active={busy} >
        <Loader>Loading...</Loader>
      </Dimmer>
      <HeaderDiv>
        <div style={{padding: 20}}>
          <img src={logo} />
        </div>
        <span className="note">
          Please select at least <b>{user.numberOfFollowings}</b> influencer(s) to follow</span>
        <span className="remaining">
          {`${FOLLOWINGS_LIMIT - user.numberOfFollowings} to go`}
        </span>
        <button disabled={user} onClick={handleNext}>
          Next
        </button>
      </HeaderDiv>
      <ListContainer>
        {
          influencers.results.map((inf,index) => (
            <InfluencerCard following={inf.isFollowing} key={index}>
              <img src={inf.profileImage} alt="profile"/>
              <span className="name">
                {inf.firstName}
              </span>
              <span className="title">
                {inf.jobTitle}
              </span>
              <button onClick={toggleFollow(inf.id)} className="follow">
              Follow
              </button>
            </InfluencerCard>
          ))
        }
      </ListContainer>
    </Container>
  )
}
