import Router, { useRouter } from "next/router"
import React, { ReactElement, useContext, useEffect } from "react"
import { Loading } from "../components"
import { magic } from "../lib/magic"
import { UserContext } from "../lib/UserContext"

interface Props {}

function Callback({}: Props): ReactElement {
  const router = useRouter()
  const [user, setUser] = useContext(UserContext)!

  // The redirect contains a `provider` query param if the user is logging in with a social provider
  useEffect(() => {
    router.query.provider ? finishSocialLogin() : finishEmailRedirectLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  // `getRedirectResult()` returns an object with user data from Magic and the social provider
  const finishSocialLogin = async () => {
    if (magic) {
      try {
        let result = await magic.oauth.getRedirectResult()
        authenticatedWithServer(result.magic.idToken)
      } catch (error) {
        console.log(error)
      }
    }
  }

  // `loginWithCredential()` returns a didToken for the user logging in
  const finishEmailRedirectLogin = async () => {
    if (router.query.magic_credentials) {
      if (magic) {
        try {
          let didToken = await magic.auth.loginWithCredential()
          didToken && authenticatedWithServer(didToken)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  // Send token to server to validate
  const authenticatedWithServer = async (didToken: string) => {
    let res = await fetch("/api/login", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + didToken,
        "Content-Type": "application/json",
      },
    })

    if (res.status === 200) {
      if (magic) {
        try {
          let userMetadata = await magic.user.getMetadata()
          await setUser(userMetadata)
          Router.push("/profile")
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  return <Loading />
}

export default Callback
