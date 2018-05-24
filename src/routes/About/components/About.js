import React from "react";

const About = () => (
  <article className="blog-post">
    <header className="blog-post-header blog-post-header--blank">
      <div className="container container--narrow">
        <div className="date">Dicember 2016 - May 2018</div>
        <h1 className="post-title">My Mondo Code Challange</h1>
      </div>
    </header>

    <section id="article-text" className="container content">
      <div id="article-text-anchor" />

      <p>
        Two years ago, I set my self to go through some of the code challenges I
        didn't have time to tackle during my job hunting process.
      </p>

      <p>
        This one is the one I enjoyed the most. Not only because I found the
        challenge to be tackling important/common points like Authentication,
        Pagination, Routing, CRUD,... But cause it offered me a canvas to
        explore some new solutions. This unexpected journey led me to co-author
        a{" "}
        <a
          href="https://github.com/cyclejs-community/redux-cycles"
          target="_blank"
        >
          js library
        </a>{" "}
        that got more than 650 stars on GitHub, and that blew my mind.
      </p>
    </section>
  </article>
);

export default About;
