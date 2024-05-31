const createState = (initialState = null) => {
  const state = {
    data: initialState,
    listeners: [],

    getState() {
      return this.data;
    },

    setState(releaseState) {
      this.data = releaseState;
      this.notify();
    },

    subscribe(listener) {
      this.listeners.push(listener);
    },

    unsubscribe(listener) {
      this.listeners = this.listeners.filter((l) => l !== listener);
    },

    notify() {
      this.listeners.forEach((listener) => listener(this.data));
    },
  };

  return state;
};

const stateRegistry = {};

const retrieveState = (stateId) => {
  const stateObj = stateRegistry[stateId];
  const subscribeToState = (listener) => {
    if (stateObj) {
      stateObj.subscribe(listener);
    } else {
      console.error(`State with id ${stateId} does not exist`);
    }
  };

  return { stateObj, subscribeToState };
};

const releaseState = (stateId, initialState = null) => {
  if (!stateRegistry[stateId]) {
    stateRegistry[stateId] = createState(initialState);
  }

  return stateRegistry[stateId];
};

export { releaseState, retrieveState };
