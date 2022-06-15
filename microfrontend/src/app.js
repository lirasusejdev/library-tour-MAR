import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { MicrofrontendContext } from "./microfrontend-context";
import MicrofrontendSample from './components/microfrontend-sample';
import ChildMicrofrontendSample from "./components/child-microfrontend-sample";


import './assets/style/style.css';

const defaultHistory = createBrowserHistory();

const App = ({ history = defaultHistory, path = "", host = "", containerContext }) => {

  const mfContextValue = {
    path: path,
    host: host,
    containerContext: containerContext
  };

  return <MicrofrontendContext.Provider value={mfContextValue}>
    <Router history={history} basename={`${path}/`} >
      <Switch>
        <Route exact path={`${path}/`} component={MicrofrontendSample} />
        <Route exact path={`${path}/child-microfrontend`} component={ChildMicrofrontendSample} />
      </Switch>
    </Router>
  </MicrofrontendContext.Provider>;
};

export default App;