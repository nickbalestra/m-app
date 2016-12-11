import React from 'react'
import List from './List'
import Breadcrumbs from './Breadcrumbs'


const Apps = ({ children, params, location }) => (
  <div>
    <Breadcrumbs
      appId={ params.appId }
      pathname={ location.pathname }
    />
    { children || <List /> }
  </div>
)

export default Apps
