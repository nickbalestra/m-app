import React, { Component } from 'react'
import { initUsers, fetchUsers } from '../../../../../ducks/users'
import { connect } from 'react-redux'
// import User from './User'

// TODO: clean markup
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
    const loadMore = users.length && users.length % 25 === 0
      ? (
        <div className='load-more' >
          <a className='btn-wide' onClick={this.props.dispatch.bind(null, fetchUsers(this.props.appId))}>Load more</a>
        </div>
      )
      : <div />

    return (
      <section id='article-text' className='container content'>
        <h1>Users</h1>
        <div className='user-list' >
          { userList }
        </div>
        { loadMore }
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
