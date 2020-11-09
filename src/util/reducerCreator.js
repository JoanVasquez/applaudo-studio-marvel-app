const reducerCreator = (initialState, reducers) => {
  return (state = initialState, action) => {
    if (reducers.hasOwnProperty(action.type)) {
      return reducers[action.type](state, action);
    }
    return state;
  };
};

export default reducerCreator;
