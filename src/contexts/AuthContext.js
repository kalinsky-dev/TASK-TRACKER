import { createContext } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage';


export const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [auth, setAuth] = useLocalStorage('auth', {});
  const userLoginHandler = (authData) => {
    setAuth(authData)
  }
  const userLogoutHandler = (authData) => {
    setAuth({})
  }
  return (
    <AuthContext.Provider value={{
      user: auth,
      userLoginHandler,
      userLogoutHandler,
      isAuthenticated: Boolean(auth.accessToken)
    }}>
      {children}
    </AuthContext.Provider>
  )
}