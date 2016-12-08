import React, { Component } from 'react'
import { fetchApps } from '../../ducks/apps'
import { connect } from 'react-redux'

class Apps extends Component{
  constructor(props) {
    super(props)
  }

  componentWillMount(){
    this.props.dispatch(fetchApps())
  }
  render(){
    return (<div></div>)
  }
}

const mapStateToProps = (state) => ({
  apps: state.apps.apps,
  isFetching: state.apps.isFetching
})




const Dashboard = ({isFetching, apps, children, dispatch}) =>

{
  return (
      <div>
        <h1>Dashboard</h1>
        <p>isFetching: {isFetching.toString()}</p>
        <p>apps: {JSON.stringify(apps)}</p>
        <Apps dispatch={dispatch} apps={apps} />
        {children}
      </div>
    )}

export default connect(
  mapStateToProps
)(Dashboard)
