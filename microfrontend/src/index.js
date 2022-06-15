import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app";
import manifest from '../public/microfrontend-manifest.json';

window[`render${manifest.microfrontendname}`] = (containerId, history, path, host, containerContext) => {
  ReactDOM.render(
    <App history={history} path={path} host={host} containerContext={containerContext} />,
    document.getElementById(containerId),
  );
};

window[`unmount${manifest.microfrontendname}`] = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

window.renderSelfContainedMicrofrontend = (containerId) =>{
  window[`render${manifest.microfrontendname}`](containerId);
}
