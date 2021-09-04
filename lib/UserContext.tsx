import { createContext } from "react"

type ContextProps = {
  children: React.ReactNode
  value: any[]
}

export const UserContext = createContext<any[] | null>(null)

export function UserContextProvider({ children, value }: ContextProps) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
