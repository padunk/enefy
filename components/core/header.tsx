import { ReactElement, useContext } from "react"
import Link from "next/link"
import Router from "next/router"
import { magic } from "../../lib/magic"
import { UserContext } from "../../lib/UserContext"
import { Box, Button, Flex } from "@chakra-ui/react"

interface Props {}

function Header({}: Props): ReactElement {
  const [user, setUser] = useContext(UserContext)!

  const logout = () => {
    if (magic) {
      magic.user.logout().then(() => {
        setUser({ user: null })
        Router.push("/login")
      })
    }
  }

  return (
    <Flex
      as="header"
      bg="purple.200"
      w="100%"
      h="50px"
      p="4"
      justifyContent="flex-end"
      alignItems="center"
      boxShadow="md"
    >
      <Flex as="nav">
        <Flex as="ul" listStyleType="none">
          <Box as="li" pr="4">
            <Link href="/">Home</Link>
          </Box>
          {user?.loading ? (
            // If loading, don't display any buttons specific to the loggedIn state
            <div style={{ height: "50px" }}></div>
          ) : user?.issuer ? (
            <>
              <Box as="li" pr="4">
                <Link href="/profile">Profile</Link>
              </Box>
              <Box as="li" pr="4">
                <Button size="sm" onClick={logout}>
                  Logout
                </Button>
              </Box>
            </>
          ) : (
            <Box as="li" pr="4">
              <Link href="/login">Login</Link>
            </Box>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header
