import React from 'react'
import List from './List'
import Navigation from './Navigation'


const Apps = ({ children, params, location }) => (
  <div>
    <Navigation
      appId={ params.appId }
      pathname={ location.pathname }
    />
    { children || <List /> }
  </div>
)

export default Apps
