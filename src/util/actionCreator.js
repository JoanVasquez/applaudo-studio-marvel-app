const actionCreator = (type, ...argNames) => {
  return (...values) => {
    if (argNames.length === values.length) {
      let action = { type };
      if (argNames.length && values.length) {
        argNames.forEach((arg, index) => {
          action[argNames[index]] = values[index];
        });
      }
      return action;
    }
  };
};

export default actionCreator;
