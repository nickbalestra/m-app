import React from 'react'
import moment from 'moment';
import { Link } from 'react-router'

const App = ({created, logo, name, id}) => (
  <Link to={`/apps/${id}`} className="blog-list-article">
    <div className="blog-list-article-date">
      Created {moment(created).fromNow()}
    </div>
    {/*<div className="blog-list-article-category">Community</div>*/}

    <div className="blog-list-article-content">
      <div className="blog-list-article-excerpt">
        <div className="appLogo">
          <div className="appLogo__img"
            style={{'backgroundImage': `url(logo-filter.png), url(${logo})`}}
          />
        </div>
      </div>
      <div className="blog-list-article-title">{name}</div>
    </div>
  </Link>
)

export default App
