import React, { Component } from 'react'

const App = ({children, params}) => (
  <div>
    {children || <h2>App {params.appId} </h2>}
    {console.log(children, params)}
  </div>
)


export default App
