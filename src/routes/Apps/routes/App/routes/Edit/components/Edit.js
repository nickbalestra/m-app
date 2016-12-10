import React, { Component } from 'react'

const Edit = ({children, params}) => (
  <div>
    <h2>Edit App {params.appId} </h2>
    {console.log(children, params)}
  </div>
)


export default Edit
