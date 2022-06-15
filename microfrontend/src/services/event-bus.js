import manifest from '../../public/microfrontend-manifest.json';

export const subscribe = (eventName, callback) => {
  return window.subscribe(eventName, manifest.microfrontendname, callback);
};

export const publish = (eventName, payload) => {
  window.publish(eventName, payload);
};