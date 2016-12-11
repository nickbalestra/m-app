import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'


const Breadcrumbs = ({appId, pathname, apps}) => {
  const appsLink = appId ?
    <Link to="/apps">Apps > </Link>
    : <span className="active">Apps</span>

  const appLink = appId && !pathname.match(/\/edit/) ?
    <span className="active">{apps[appId]['name']}</span>
    : appId && <Link to={`/apps/${appId}`}>{apps[appId]['name']}</Link>

  const editLink = appId && pathname.match(/\/edit/) &&
    <span className="active"> > Edit</span>

  const routes = (
    <h1 className="blog-list-header-title">
      {appsLink}
      {appLink}
      {editLink}
    </h1>
  )

  return(
    <div className="blog-list-header">
      {routes}
    </div>
  )
}


const mapStateToProps = (state) => ({
  apps: state.apps.apps
})

export default connect(
  mapStateToProps
)(Breadcrumbs)
