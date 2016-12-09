import React from 'react'
import Apps from './components/apps'



export default ({children}) =>

{
  return (
      <div>
        <Apps />
        {children}
      </div>
    )}


