import React from 'react'
import NavLink from './NavLink'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { doLogout } from '../../../ducks/auth'

const Header = ({logout, loggedIn}) => (
  <header className=''>
    <div className='container'>
      <div className='navbar-left'>
        <Link to='/'>
          <img className='logo logo-mark' src='https://monzo.com/static/images/logo-inverse.svg' alt='Monzo' />
          <img className='logo logo-full' src='https://monzo.com/static/images/logo-inverse.svg' alt='Monzo' />
        </Link>
      </div>
      <div className='navbar-right'>
        <NavLink to={`/about`} className='btn'>About</NavLink>
        { loggedIn && <a className='btn' onClick={logout}>logout</a> }
        { !loggedIn && <NavLink to='/login' className='btn'>login</NavLink> }
      </div>
    </div>
  </header>
)

const mapStateToProps = (state) => ({
  loggedIn: !!state.auth.token
})

const mapDispatchToProp = (dispatch, state) => ({
  logout () {
    dispatch(doLogout())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(Header)
