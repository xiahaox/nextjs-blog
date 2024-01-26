import React, { useReducer } from 'react';
import { save, get, remove } from '@/utils/storage'

const myContext = React.createContext({});
const userStr = get('userInfo');


// typeof window !== 'undefined' ? window.localStorage.getItem('user') : '{}';

let initState = {
  setting: {},
  i18n: {},
  locale: '',
  locales: [],
  pages: [],
  categories: [],
  tags: [],
  changeLocale: () => { },
  user: userStr ? userStr : {},
  setUser: () => { },
  removeUser: () => { },
};
function reducter(state, action) {
  const { type, payload } = action
  switch (type) {
    case 'USER_LOGIN':
      const { username, userId, role, github = null, token } = payload;
      save('userInfo', { username, userId, role, github, token })
      return { ...state, user: { username, userId, role, github } }

    case 'USER_LOGIN_OUT':
      remove('userInfo')
      return { ...state, user: { username: '', userId: 0, role: 2, github: null } }
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
