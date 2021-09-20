import { Flex, Text } from "@chakra-ui/react"
import Head from "next/head"
import React, { ReactElement, ReactNode } from "react"
import Header from "./header"

interface Props {
  children: ReactNode
}

function Layout({ children }: Props): ReactElement {
  return (
    <>
      <Head>
        <title>Enefy</title>
        <meta
          name="description"
          content="Enefy is nft social medial where you can sell your own content in an instant."
        />
      </Head>
      <Flex
        flexDir="column"
        bg="gray.200"
        alignItems="center"
        border="1px"
        borderColor="black"
        minHeight="100vh"
      >
        <Header />
        <Flex flexGrow={1} flexDir="column" w="100%">
          {children}
        </Flex>
        <Flex
          as="footer"
          bg="purple.300"
          h="40px"
          w="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Text>Created by</Text>
        </Flex>
      </Flex>
    </>
  )
}

export default Layout
