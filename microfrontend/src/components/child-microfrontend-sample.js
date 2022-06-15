import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { subscribe, publish } from '../services/event-bus';
import { MicrofrontendContext } from '../microfrontend-context';

const smallScreen = `@media(max-width: 1080px)`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;

  ${smallScreen} {
    flex-direction: column;
    align-items: center;
  }
`;

const TextColumn = styled.section`
  display: flex;
  max-width: 100%;
  flex-direction: column;
  ${smallScreen} {
    width: 100%;
  }
`;

const ChildMicrofrontendSample = () => {
  const localContext = useContext(MicrofrontendContext);
  console.log('Container context:');
  console.log(localContext.containerContext);

  useEffect(() => {
    publish('event-mfe', { content: 'payload from micro frontend to container' });

    const cancelSubscription = subscribe('event-container', (payload) => {
      console.log('Called event-container');
      console.log(`With content: "${payload.content}"`);
    })

    return () => cancelSubscription();
  }, []);

  return (
    <div>
      <h2>This is a Child Microfront End</h2>
      <p>
        A sample for a child microfront end.
      </p>
    </div>
  );
};

export default ChildMicrofrontendSample;
