import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editApp } from '../../../../../../../ducks/apps'

const mapStateToProps = (state) => ({
  apps: state.apps.apps
})
// default value of the form field taken from app values

class Edit extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: this.props.apps[this.props.params.appId].name,
      logo: this.props.apps[this.props.params.appId].logo
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSumbit = this.handleSumbit.bind(this)
  }

  handleInputChange ({target}) {
    switch (target.name) {
      case 'name':
        return this.setState({name: target.value})
      case 'logo':
        return this.setState({logo: target.value})
    }
  }

  handleSumbit (event) {
    event.preventDefault()
    const app = this.props.apps[this.props.params.appId]
    const {name, logo} = this.state
    if (name !== app.name || logo !== app.logo) {
      this.props.dispatch(editApp(app.id, name, logo))
    }
  }

  render () {
    const app = this.props.apps[this.props.params.appId]

    return (
      <div>
        <h2>Edit App {app.name} </h2>
        <form onSubmit={this.handleSumbit}>
          <label><input name='name' onChange={this.handleInputChange} placeholder='name' value={this.state.name} /></label>
          <label><input name='logo' onChange={this.handleInputChange} placeholder='logo' value={this.state.logo} /></label>
          <button type='submit'>Save</button>

        </form>

        {console.log(this.props)}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Edit)
