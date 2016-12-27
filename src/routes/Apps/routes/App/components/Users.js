import React from 'react'
// import { connect } from 'react-redux'
// import { fetchUsers } from '../../../ducks/users'
// import { Link } from 'react-router'
// import moment from 'moment'

// const mapStateToProps = (state) => ({
//   apps: state.apps.apps
// })

const Users = ({name, email, avatar}) => {
  return (
    <section id='article-text'>
      <h1>Users</h1>
      <div>
        <p>
          Name: Nick<br />
          Email: somewhere@overtherainbow.com
        </p>
      </div>
      <hr />
      <div>
        <p>
          Name: Nick<br />
          Email: somewhere@overtherainbow.com
        </p>
      </div>
      <hr />
      <div>
        <p>
          Name: Nick<br />
          Email: somewhere@overtherainbow.com
        </p>
      </div>
      <hr />
      <a>BUTTON</a>
    </section>
  )
}

// const AppView = connect(
//   mapStateToProps
// )(App)

// const View = ({children, params}) => children || <AppView appId={params.appId} />

export default Users
