import React from 'react';

const testValue = 'Hello, from container!';

const defaultContextValue = {
  user: {
    name: 'Test User',
    cpf: '999.999.999-99'
  },
  updateUser: (user) => {},
  auth: {
    token: 'test.token',
    testFunc: () => testValue
  },
  updateAuth: (auth) => {}
};

export const ContainerContext = React.createContext(defaultContextValue);
