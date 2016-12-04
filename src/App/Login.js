import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'


const mapStateToProps = (state) => ({
  ...state.user,
  ...state.auth
})

const mapDispatchToProps = (dispatch, props) => ({
  handleSubmit({email, password}) {
    return (event) => {
      event.preventDefault()
      dispatch({type: 'LOGIN', payload: {email, password}})
    }
  },
  handleInputChange(type) {
    return (event) => {
      dispatch({type, payload: event.target.value})
    }
  }
})

const loginView = (props) => {
  const {
    email,
    password,
    handleSubmit,
    handleInputChange,
    error,
    inProgress} = props

  return (
    <div className="Login">
      <div className="login-group">
        <form onSubmit={handleSubmit({email, password})}>
          <label><input onInput={handleInputChange('EMAIL')} placeholder="email" value={email} /></label>
          <label><input type="password" onInput={handleInputChange('PASSWORD')} placeholder="password" value={password}/></label>
          <button type="submit">Login</button>
          {error && (
            <p className="msg">😞 Bad login information</p>
          )}
          {inProgress && (
            <p className="msg">....</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(loginView))



















// class Login extends Component {

//   constructor(props){
//     super(props)
//     this.state = {
//       error: false,
//       loading: false
//     }
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }


//   handleSubmit(event) {
//     event.preventDefault()

//     const email = this.refs.email.value
//     const pass = this.refs.pass.value
//     this.setState({loading: true, error: ''})
//     auth.login(email, pass, (loggedIn) => {
//       this.setState({loading: false})
//       if (!loggedIn)
//         return this.setState({ error: true})

//       const { location } = this.props

//       if (location.state && location.state.nextPathname)
//         this.props.router.replace(location.state.nextPathname)

//       this.props.router.replace('/')
//     })
//   }

//   render() {
//     return (
//       <div className="Login">
//         <div className="login-group">
//           <form onSubmit={this.doLogin}>
//             <label><input ref="email" placeholder="email" /></label>
//             <label><input type="password" ref="pass" placeholder="password" /></label>
//             <button type="submit">Login</button>
//             {this.state.error && (
//               <p className="msg">😞 Bad login information</p>
//             )}
//             {this.state.loading && (
//               <p className="msg">....</p>
//             )}
//           </form>
//         </div>
//       </div>
//     )
//   }
// }
