import React, { Component } from 'react'
import Header from './header'
import { connect } from 'react-redux'


const mapStateToProps = (state) => ({
  loggedIn: !!state.auth.token
})

const App = ({loggedIn, children}) => (
  <div>
    <Header loggedIn={loggedIn} />
    <div className="content">
      {children}
    </div>
  </div>
)

export default connect(
  mapStateToProps,
)(App)
