import React, { Component } from 'react'
import Header from './Header'
import { connect } from 'react-redux'


const mapStateToProps = (state) => ({
  loggedIn: !!state.auth.token
})

const appLayout = (props) => (
  <div>
    <Header loggedIn={props.loggedIn} />
    <div className="content">
      {props.children}
    </div>
  </div>
)

export default connect(
  mapStateToProps,
)(appLayout)