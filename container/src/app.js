import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppHeader from './app-header';
import MicroFrontend from './components/micro-frontend';
import About from './about';
import { subscribe } from './services/event-bus';
import { ContainerContext } from './container-context';

import './assets/style/style.css';

const {
  REACT_APP_MICROFRONTEND_SAMPLE_HOST: microfrontendSampleHost
} = process.env;

const MicroFrontendSample = ({ history }) => {
  const containerContext = useContext(ContainerContext);

  return (
    <MicroFrontend 
      history={history} 
      host={microfrontendSampleHost} 
      path="/microfrontend-sample" 
      containerContext={containerContext}
    />
  );
};

const App = () => {
  const context = useContext(ContainerContext);

  const [user, setUser] = useState(context.user);
  const [auth, setAuth] = useState(context.auth);

  const updateUser = (updatedUser) => setUser(updatedUser);
  const updateAuth = (updatedAuth) => setAuth(updatedAuth);

  useEffect(() => {
    const cancelSubscription = subscribe('event-mfe', (payload) => {
      console.log('Called event-mfe');
      console.log(`With content: "${payload.content}"`);
    })

    return () => {
      cancelSubscription();
    }
  }, []);

  return (
    <BrowserRouter>
      <React.Fragment>
        <ContainerContext.Provider value={{ user, auth, updateUser, updateAuth }}>
          <AppHeader />
          
          <Switch>
            <Route exact path="/" render={About} />
            <Route path="/microfrontend-sample" component={MicroFrontendSample} />
            <Route exact path="/about" render={About} />
          </Switch>
        </ContainerContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );

}

export default App;