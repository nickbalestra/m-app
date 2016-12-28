import React, { Component } from 'react'
import { initUsers } from '../../../../../ducks/users'
import { connect } from 'react-redux'
// import User from './User'

const User = ({name, email, avatar}) => (
  <section className='blog-post-author'>
    <div className='blog-post-author-container'>
      <div className='m-app userAvatar'>
        <div
          className='blog-post-author-image'
          style={{'backgroundImage': `url(/static/images/logo-filter.png), url(${avatar})`}}
        />
      </div>
      <div className='blog-post-author-details'>
        <p className='blog-post-author-name'>{name}</p>
        <p className='blog-post-author-title'><a href={`mailto:${email}`}>{email}</a></p>
      </div>
    </div>
    <hr />
  </section>
)

class Users extends Component {
  componentDidMount () {
    this.props.dispatch(initUsers(this.props.appId))
  }

  render () {
    let { users } = this.props
    const userList = users.map((user) => <User key={user.id} {...user} />)

    return (
      <section id='article-text'>
        <h1>Users</h1>
        <section id='article-text' className='container content blog20161212christmas-faqs'>
          { userList }
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users.users
})

export default connect(
  mapStateToProps
)(Users)
