// { eventName: { mfid: callback } }
const subscriptions = {};

/**
 * Subscribe to an event declared on the global scope.
 * @param {string} eventName
 * @param {string|number} mfid Micro frontend ID.
 * @param {object} callback Callback function, called when the event is fired.
 */
window.subscribe = (eventName, mfid, callback) => {
  if(!subscriptions[eventName]) {
    subscriptions[eventName] = {};
  }

  subscriptions[eventName][mfid] = callback;

  return () => {
    delete subscriptions[eventName][mfid]
    if(Object.keys(subscriptions[eventName]).length === 0) delete subscriptions[eventName]
  };
};

/**
 * Dispatch an event to all its' subscribers.
 * @param {string} eventName
 * @param {object} payload Event callback payload.
 */
window.publish = (eventName, payload) => {
  if(!subscriptions[eventName]) return;

  Object.keys(subscriptions[eventName]).forEach(key => subscriptions[eventName][key](payload));
};
