import { useEffect, useState, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import AuthContext from "./AuthContext";

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setuser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
      // console.log(currentUser);
    });

    return () => { 
      unsub();
    };
  }, []); 

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
