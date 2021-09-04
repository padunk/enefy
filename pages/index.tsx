import { Flex } from "@chakra-ui/react"
import type { NextPage } from "next"
import { useContext } from "react"
import { Loading } from "../components"
import { UserContext } from "../lib/UserContext"

const Home: NextPage = () => {
  const [user] = useContext(UserContext)!
  return (
    <Flex as="main">
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && <p>you&apos;re logged in</p>
      )}
    </Flex>
  )
}

export default Home
