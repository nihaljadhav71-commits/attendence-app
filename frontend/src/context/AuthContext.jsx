import { createContext, useContext, useState } from "react";
const AuthCtx=createContext();
export function AuthProvider({children}){
  const [user,setUser]=useState(null); // {role: "admin" | "teacher" | "student"}
  const login=(u)=>setUser(u);
  const logout=()=>setUser(null);
  return <AuthCtx.Provider value={{user,login,logout}}>{children}</AuthCtx.Provider>;
}
export const useAuth=()=>useContext(AuthCtx);
