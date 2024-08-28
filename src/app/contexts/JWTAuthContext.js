import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios.js';
import { MatxLoading } from 'app/components';

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const setSession = (accessToken, accessLevel) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('accessLevel', accessLevel);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessLevel');
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case 'LOGIN': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'REGISTER': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => { },
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    // const response = await axios.post('/api/auth/login', {
    //   email,
    //   password,
    // });
    // let { accessToken, user } = response.data;
    // console.log('accessToken, user', user);
    // setSession(accessToken);
    // user = {
    //   id: 1,
    //   avatar: '/assets/images/face-6.jpg',
    //   email: 'jason@ui-lib.com',
    //   name: 'Jason Alexander',
    //   role: 'SA',
    // };
    // dispatch({
    //   type: 'LOGIN',
    //   payload: {
    //     user,
    //   },
    // });

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
      userName: email,
      password,
    });
    console.log('response.data', response.data);
    const { token: accessToken, userData } = response.data;
    let user = {
      id: 1,
      avatar: '/assets/images/face-6.jpg',
      email: 'jason@ui-lib.com',
      name: 'Jason Alexander',
      role: 'SA',
    };

    setSession(accessToken, userData.accesslevel);

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  const register = async (email, username, password) => {
    const response = await axios.post('/api/auth/register', {
      email,
      username,
      password,
    });

    const { accessToken, user, userData } = response.data;

    setSession(accessToken, userData.accesslevel);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    setSession(null, null);
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const accessLevel = window.localStorage.getItem('accessLevel');
        if (accessToken) {
          setSession(accessToken, accessLevel);
          //   const response = await axios.get('/api/auth/profile');
          //   const { user } = response.data;
          let user = {
            id: 1,
            avatar: '/assets/images/face-6.jpg',
            email: 'jason@ui-lib.com',
            name: 'Jason Alexander',
            role: 'SA',
          };

          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INIT',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialised) {
    return <MatxLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
