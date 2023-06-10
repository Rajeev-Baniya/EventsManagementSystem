import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loding: false,
  error: null,
  token: JSON.parse(localStorage.getItem("token")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loding: true,
        error: null,
        token: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.data,
        loding: false,
        error: null,
        token: action.payload.token,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loding: false,
        error: action.payload,
        token: null,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        user: null,
        loading: false,
        error: null,
        token: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", JSON.stringify(state.token));
  }, [state.user, state.token]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        token: state.token,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
