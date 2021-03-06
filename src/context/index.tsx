import React, { useReducer } from 'react';

const myContext = React.createContext({});

let initState = {
  setting: {},
  i18n: {},
  locale: '',
  locales: [],
  pages: [],
  categories: [],
  tags: [],
  changeLocale: () => {},
  user: null,
  setUser: () => {},
  removeUser: () => {},
};
function reducter(state, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const ContextProvider = (props) => {
  initState = { ...initState, ...props.store };
  const [state, dispatch] = useReducer(reducter, initState);
  return (
    <myContext.Provider value={{ state, dispatch }}>
      {props.children}
    </myContext.Provider>
  );
};

export { ContextProvider, myContext };
