import "../styles/globals.css"
import type { AppProps } from "next/app"
import { useState, useEffect } from "react"
import Router from "next/router"
import { ChakraProvider } from "@chakra-ui/react"
import { magic } from "../lib/magic"
import { UserContextProvider } from "../lib/UserContext"
import { Layout } from "../components"

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<null | any>(null)

  useEffect(() => {
    setUser({ loading: true })
    if (magic) {
      magic.user.isLoggedIn().then((isLoggedIn) => {
        if (isLoggedIn) {
          magic &&
            magic.user.getMetadata().then((userData) => setUser(userData))
        } else {
          Router.push("/login")
          setUser({ user: null })
        }
      })
    } else {
      throw new Error("magic link is not available")
    }
  }, [])

  return (
    <ChakraProvider>
      <UserContextProvider value={[user, setUser]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
