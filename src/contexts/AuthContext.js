import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [logInAuthError, setLogInAuthError] = useState("");
  const [signUpAuthError, setSignUpAuthError] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    async function initLogIn() {
      try {
        const response = await fetch("https://myreactapp.site/login", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          const user = data.user;
          setCurrentUser(user);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    }
    initLogIn();
  }, []);

  async function logInWithEmailAndPassword(email, password) {
    try {
      setLogInAuthError("");
      setLoading(true);
      let response = await fetch("https://myreactapp.site/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const user = data.user;
        setCurrentUser(user);
      } else {
        const errorText = await response.text();
        setLogInAuthError(errorText);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

  async function logOut() {
    try {
      let response = await fetch("https://myreactapp.site/logout", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        setCurrentUser(null);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function signUp(name, email, password, passwordConfirmation) {
    try {
      setSignUpAuthError("");
      setLoading(true);
      let response = await fetch("https://myreactapp.site/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ name, email, password, passwordConfirmation }),
      });
      if (response.ok) {
        setLoading(false);
        history.push("/login");
      } else {
        const errorText = await response.text();
        setLoading(false);
        setSignUpAuthError(errorText);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

  const value = {
    currentUser,
    logInAuthError,
    signUpAuthError,
    loading,
    logInWithEmailAndPassword,
    signUp,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
