import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'


const mapStateToProps = (state) => ({
  apps: state.apps.apps
})


const App = ({apps, appId}) => {
  const app = apps[appId]
  return (
  <div>
      <Link to={`/apps/${appId}/edit`} className="blog-list-article">click to Edit</Link>

    <div>appId: {app.name}</div>
    <div>appId: {app.logo}</div>
    <div>appId: {app.created}</div>
    <div>appId: {app.id}</div>
  </div>
)}

const AppView = connect(
  mapStateToProps
)(App)


const View = ({children, params}) => children || <AppView appId={params.appId} />

export default View

