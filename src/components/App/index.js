import React, { Component } from 'react'
import Header from './header'
import { connect } from 'react-redux'
import { doLogout } from '../../ducks/auth'


const mapStateToProps = (state) => ({
  loggedIn: !!state.auth.token
})


const mapDispatchToProp = (dispatch, state) => ({
  logout(){
    dispatch(doLogout())
  }
})

const App = ({loggedIn, children, logout}) => (
  <div>
    <Header loggedIn={loggedIn} logout={logout} />
    <div className="content">
      {children}
    </div>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(App)
