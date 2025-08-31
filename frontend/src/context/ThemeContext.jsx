import { createContext, useContext, useState, useMemo } from "react";
const ThemeCtx = createContext();
export function ThemeProvider({children}) {
  const [theme,setTheme]=useState("light");
  const value=useMemo(()=>({theme,setTheme,toggle:()=>setTheme(t=>t==="light"?"dark":"light")}),[]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}
export const useTheme=()=>useContext(ThemeCtx);
