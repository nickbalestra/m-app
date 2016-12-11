import React, { Component } from 'react'
import { fetchApps } from '../../../ducks/apps'
import { connect } from 'react-redux'
import App from './App';


class List extends Component{
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.props.dispatch(fetchApps())
  }

  render(){
    const { isFetching, apps } = this.props
    let appComponents = Object.keys(apps)

    if (appComponents.length) {
      appComponents = appComponents.map(id => <App key={id} {...apps[id]} />)
    }

    return (
      <div className="blog-list-articles">
        { appComponents }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  apps: state.apps.apps,
  isFetching: state.apps.isFetching
})

export default connect(
  mapStateToProps
)(List)
