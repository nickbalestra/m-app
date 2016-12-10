import React from 'react'
import Apps from './components/apps'


export default ({children}) => (
  <div>
   { children || <Apps /> }
  </div>
)
