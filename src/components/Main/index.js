import React, { Component } from 'react'
import Header from './components/header'


const Layout = (props) => (
  <div>
    <Header />
    <div className="content">
      {props.children}
    </div>
  </div>
)

export default Layout
