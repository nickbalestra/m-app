import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'


const mapStateToProps = (state) => ({
  apps: state.apps.apps
})


const App = ({apps, appId}) => {
  const app = apps[appId]
  return (


  <div className="featured-article featured-article--blank">
              <div>
                <img className="blog-list-article-arrow" src="/static/images/right-arrow-2-white.svg" />


                <div className="featured-article-date">Created: {app.created}</div>
                <div className="featured-article-category">
                   <Link className="btn" to={`/apps/${app.id}/edit`}>Edit App</Link>
                </div>
                <div className="featured-article-title">{app.name}</div>
                {/*<div className="featured-article-subtitle">Collecting money from other people has always been a pain so today we're introducting Monzo.me on iOS!</div>


                 <div>
      <Link to={`/apps/${appId}/edit`} className="blog-list-article">click to Edit</Link>

    <div>appId: {app.name}</div>
    <div>appId: {app.logo}</div>
    <div>appId: {app.created}</div>
    <div>appId: {app.id}</div>
  </div>
        */}
              </div>
            </div>
)}

const AppView = connect(
  mapStateToProps
)(App)


const View = ({children, params}) => children || <AppView appId={params.appId} />

export default View

