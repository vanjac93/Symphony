import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { NewsContainer, StyledNavItem, Post } from './index.styled'
import {Routes} from '~/Constants'
import userApi from '~/services/user'
import postsApi from '~/services/posts'
import ReactPaginate from 'react-paginate'
import UserContext from '../common/UserContext'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Icon, Input, Segment } from 'semantic-ui-react'
import likeSvg from '../../../public/assets/images/like.svg'
import likedSvg from '../../../public/assets/images/like.svg'
import newsLogo from '../../../public/assets/images/news-logo.svg'
import logoutSvg from '../../../public/assets/images/logout.svg'
import newsHomeSvg from '../../../public/assets/images/news-home.svg'
import newsImage from '../../../public/assets/images/news-image.svg'

dayjs.extend(relativeTime)

const NAV_ITEMS = {
  HOME: ''
  // ...
}

const PER_PAGE = 20

function NavItem(props) {
  return <StyledNavItem active={props.active}>
    <button onClick={props.onClick}>
      <img src={props.iconSrc} />
      <span>{props.name}</span>
    </button>
  </StyledNavItem>
}

export default function News() {
  const history = useHistory()
  const [posts, setPosts] = useState({
    count: 0,
    next: null,
    previous: null,
    results: []
  })
  const [isBusy, setIsBusy] = useState(false)
  const [page, setPage] = useState(1)
  const {user, setUser} = useContext(UserContext)
  const [offset, setOffset] = useState(0)
  const [post, setPost] = useState({
    text: ''
  })

  const [activeNavItem, setActiveNavItem] = useState(NAV_ITEMS.HOME)
  const fetchPosts = async () => {
    setIsBusy(true)
    const [data,err,resp] = await postsApi.getNews(page)
    setPosts(data)
    setIsBusy(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [page])

  const handleLogout = async () => {
    setIsBusy(true)
    const [data,err,response] = await userApi.logout()
    setUser(null)
    setIsBusy(false)
    history.push(Routes.LOGIN)
  }

  const handlePageChange = data => {
    const offset = Math.ceil(data.selected * PER_PAGE)
    setOffset(offset)
    setPage(data.selected+1)
  }

  const handleUpload = () => {

  }

  function renderNavbar() {
    return (
      <div className="navbar">
        <img className="logo" src={newsLogo} />
        <NavItem name="Home" iconSrc={newsHomeSvg}
          onClick={() => setActiveNavItem(NAV_ITEMS.HOME)}
          active={activeNavItem===NAV_ITEMS.HOME}  />
        <NavItem name="Logout" iconSrc={logoutSvg}
          onClick={handleLogout} active={false} />
      </div>
    )
  }

  const handlePostInputChange = ({currentTarget: {value}}) => setPost({text: value})

  const handlePost = async () => {
    if(post.text) {
      const [data,err,resp] = await postsApi.post(post)
    }
  }

  function renderNews() {
    return user && (
      <Fragment>
        <div className="share">
          <img src={user.profileImage} alt="" />
          <input value={post.text} onChange={handlePostInputChange}
            placeholder="What's on your mind?">
          </input>
          {
            user.isInfluencer && (
              <button>Upload image</button>
            )
          }
          <button onClick={handlePost}>Post</button>

        </div>
        <Segment basic loading={isBusy}>
          <h3>Home</h3>
          {
            posts.results.map(post => <Post key={post.id}>
              <div className="header">
                <div className="info">
                  <img className="avatar" src={post.user.profileImage} />
                  <span className="name">
                    {post.user.firstName}
                  </span>
                  <span className="username">
                    {post.user.username}
                  </span>
                </div>
                <div className="created-on">
                  {
                    dayjs(post.createdOn, 'DD/MM/YYYY HH:MM').fromNow()
                  }
                </div>
              </div>
              <div className="content">
                {post.text}
                <div className="reaction">
                  <img src={likeSvg} />
                  <img src={likedSvg} />
                </div>
              </div>
            </Post>)}
        </Segment>
      </Fragment>
    )
  }

  function renderPaginate() {
    return !isBusy && <ReactPaginate
      previousLabel="previous"
      nextLabel="next"
      breakLabel={'...'}
      breakClassName="break-me"
      pageCount={Math.ceil(posts.count/PER_PAGE)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      containerClassName="pagination"
      activeClassName="active"
    />
  }

  return (
    <NewsContainer>
      {renderNavbar()}
      <div className="feed">
        {renderNews()}
        {renderPaginate()}
      </div>
      <div style={{flex:1}} />
    </NewsContainer>
  )
}
