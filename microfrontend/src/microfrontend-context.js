/**
 * Context to share parameters received from Container
 */

import React from 'react';

const mfContextValue = {
  path: ""
};
export const MicrofrontendContext = React.createContext(mfContextValue);