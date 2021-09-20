import { Flex, Heading, useMediaQuery } from "@chakra-ui/react"
import { OAuthProvider } from "@magic-ext/oauth"
import axios from "axios"
import Router from "next/router"
import React, { ReactElement, useContext, useEffect, useState } from "react"
import { magic } from "../lib/magic"
import { UserContext } from "../lib/UserContext"
import { EmailForm, SocialLogins } from "../components"

interface Props {}

function Login({}: Props): ReactElement {
  const [disabled, setDisabled] = useState(false)
  const [user, setUser] = useContext(UserContext)!
  const [isLargerThan720] = useMediaQuery("(min-width: 720px)")

  useEffect(() => {
    user?.issuer && Router.push("/profile")
  }, [user])

  const handleLoginWithEmail = async (email: string) => {
    try {
      setDisabled(true)
      if (magic) {
        let didToken = await magic.auth.loginWithMagicLink({
          email,
          redirectURI: new URL("/callback", window.location.origin).href,
        })
        const res = await axios("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + didToken,
          },
        })

        if (res.status === 200) {
          let userMetadata = await magic.user.getMetadata()
          await setUser(userMetadata)
          Router.push("/profile")
        }
      }
    } catch (error) {
      setDisabled(false)
      console.error(error)
    }
  }

  const handleLoginWithSocial = async (provider: OAuthProvider) => {
    if (magic) {
      await magic.oauth.loginWithRedirect({
        provider,
        redirectURI: new URL("/callback", window.location.origin).href,
      })
    }
  }

  return (
    <Flex
      flexGrow={1}
      flexDir="column"
      bgGradient="linear(100deg, transparent, transparent 50%, purple.500 calc(50% + 1px), purple.400 50%)"
    >
      <Heading
        as="h2"
        textAlign="center"
        pt="16"
        color="orangered"
        letterSpacing="wide"
      >
        LOGIN
      </Heading>
      <Flex
        flexGrow={1}
        flexDir={isLargerThan720 ? "row" : "column"}
        justifyContent={isLargerThan720 ? "space-around" : "flex-start"}
        alignItems="center"
        mt="-16"
      >
        <EmailForm disabled={disabled} handleSubmit={handleLoginWithEmail} />
        <SocialLogins handleSubmit={handleLoginWithSocial} />
      </Flex>
    </Flex>
  )
}

export default Login
