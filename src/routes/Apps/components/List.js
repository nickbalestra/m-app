import React, { Component } from 'react'
import { fetchApps } from '../../../stores/ducks/apps'
import { connect } from 'react-redux'
import ListItem from './ListItem'

class List extends Component {
  componentDidMount () {
    this.props.dispatch(fetchApps())
  }

  render () {
    const { apps } = this.props
    let appComponents = Object.keys(apps)

    if (appComponents.length) {
      appComponents = appComponents.map(id => <ListItem key={id} {...apps[id]} />)
    }

    return (
      <div className='blog-list-articles'>
        { appComponents }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  apps: state.apps.apps
})

export default connect(
  mapStateToProps
)(List)
