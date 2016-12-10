import React, { Component } from 'react'
import List from './List'

const Apps = ({children, params}) => children || <List />

export default Apps
