import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(email, password);
    return setDoc(doc(db, "user", email), {
      favorites: [],
    });
  };
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    // return signOut(auth);
  };

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged((currentUser) => {
    //   setUser(currentUser);
    // });
    // return () => {
    //   unsubscribe();
    // };
  }, []);

  return (
    <UserContext.Provider value={{ signUp, signIn, logout, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
