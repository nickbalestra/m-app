import React, { Component } from 'react'
import { fetchApps } from '../../../ducks/apps'
import { connect } from 'react-redux'
import App from './app';


class Apps extends Component{
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.props.dispatch(fetchApps())
  }

  render(){
    const { isFetching, apps } = this.props
    const appComponents = Object.keys(apps)
      .map(id => <App key={id} {...apps[id]} />)

    return (
      <div>
        <div className="blog-list-header">
          <h1 className="blog-list-header-title">Your Monzo Apps</h1>
          {/*
            <div className="blog-list-header-social-buttons">
              <span>Follow us:</span>
              <ul>
                <li><a href="https://twitter.com/monzo" target="_blank"><i className="fa fa-twitter"></i></a></li>
                <li><a href="https://www.facebook.com/monzobank" target="_blank"><i className="fa fa-facebook"></i></a></li>
                <li><a href="https://www.linkedin.com/company/monzo-bank" target="_blank"><i className="fa fa-linkedin"></i></a></li>
                <li><a href="mailto:hello@monzo.com" target="_blank"><i className="fa fa-envelope"></i></a></li>
              </ul>
            </div>
          */}
        </div>

        <div className="blog-list-articles">
          { appComponents }
        </div>
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
)(Apps)
