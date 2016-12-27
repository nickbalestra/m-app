import React, { Component } from 'react'
import { initUsers } from '../../../../../ducks/users'
import { connect } from 'react-redux'
// import User from './User'

const User = ({name, email}) => (
  <div>
    <p>
      Name: {name}<br />
      Email: {email}
    </p>
  </div>
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
        { userList }
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
