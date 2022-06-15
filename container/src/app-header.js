import React from 'react';
import { NavLink } from 'react-router-dom';

import { publish } from './services/event-bus';
import ImageWithHost from './components/image-with-host'

import LogoGroupWhite from './assets/images/logo-grupo-white.png';

import './app-header.css';

const AppHeader = () => {
  const dispatchEvent = () => {
    publish('event-container', { content: 'payload from container to micro frontends' });
  };

  return (
    <header>
      <div className="center-column">
        <h1><ImageWithHost src={LogoGroupWhite} /></h1>
      </div>

      <nav>
        <ol className="center-column">
          <li>
            <NavLink to="/microfrontend-sample">Microfrontend Sample</NavLink>
          </li>

          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          
          <li>
            <button onClick={dispatchEvent}>Dispatch container event</button>
          </li>
        </ol>
      </nav>
    </header>
  );
};

export default AppHeader;
