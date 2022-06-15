import React from 'react';

const About = () => (
  <main id="about">
    <h2>About this template</h2>
    <p>
      This template was create by "<a href="https://wiki.grupoboticario.digital/wiki/Squad_Nova_extranet">Squad Nova Extranet</a>" as a boilerplate
      for new projects that must be "embedded", as a microfrontend, in the extranet solution.
    </p>
    <p>
      Micro frontends is an architectural style where independently deliverable
      frontend applications are composed into a greater whole. It's useful for
      breaking up monolithic frontend codebases into smaller, simpler
      applications that can be delivered to production by multiple teams
      independently.
    </p>
    <p>
      To read more about the technique check out the{' '}
      <a href="https://martinfowler.com/articles/micro-frontends.html">
        long-form article that Cam wrote for martinfowler.com
      </a> used as a base code for this template.
    </p>
  </main>
);

export default About;
