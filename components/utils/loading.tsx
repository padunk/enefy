import { Flex, Spinner } from "@chakra-ui/react"
import React, { ReactElement } from "react"

interface Props {}

function Loading({}: Props): ReactElement {
  return (
    <Flex>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  )
}

export default Loading
