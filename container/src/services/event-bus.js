export const subscribe = (eventName, callback) => {
  return window.subscribe(eventName, 'container', callback);
};

export const publish = (eventName, payload) => {
  window.publish(eventName, payload);
};