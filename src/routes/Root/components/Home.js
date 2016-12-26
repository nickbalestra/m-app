import React from 'react'
import Header from './Header'

const Layout = (props) => (
  <div>
    <Header />
    <div className='content'>
      {props.children}
    </div>
  </div>
)

export default Layout
