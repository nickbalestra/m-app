import React from 'react'
import NavLink from './navLink'
import { Link } from 'react-router'


const About = (props) => {
  const loggedInNav = (
      <div className="navbar-right">
        <NavLink to={`/`} onlyActiveOnIndex className='btn'>Dashboard</NavLink>
        <NavLink to={`/about`} className='btn'>About</NavLink>
        <a className='btn' onClick={props.logout}>logout</a>
      </div>
    )

    const loggedOutNav = (
      <div className="navbar-right">
        <NavLink to="/about" className='btn'>About</NavLink>
        <NavLink to="/login" className='btn'>login</NavLink>
      </div>
    )

  return (
    <header className="">
      <div className="container">
        <div className="navbar-left">
          <Link to="/">
            <img className="logo logo-mark" src="https://monzo.com/static/images/logo-inverse.svg" alt="Monzo" />
            <img className="logo logo-full" src="https://monzo.com/static/images/logo-inverse.svg" alt="Monzo" />
          </Link>
        </div>
        {
          props.loggedIn ?
            loggedInNav
              :
            loggedOutNav
        }
      </div>
    </header>
  )
}

export default About
