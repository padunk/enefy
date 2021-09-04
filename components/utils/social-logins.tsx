import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import React, { ReactElement, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { GrApple, GrFacebook } from "react-icons/gr"
import { FaGithub, FaTwitter } from "react-icons/fa"
import { OAuthProvider } from "@magic-ext/oauth"
import Redirecting from "./redirecting"

interface Props {
  handleSubmit: (provider: OAuthProvider) => Promise<void>
}

type Provider = {
  name: OAuthProvider
  icon: ReactElement
  colorScheme: string
}

const providers: Provider[] = [
  // { name: "apple", icon: <GrApple />, colorScheme: "blackAlpha" },
  // { name: "facebook", icon: <GrFacebook />, colorScheme: "facebook" },
  { name: "github", icon: <FaGithub />, colorScheme: "gray" },
  // { name: "google", icon: <FcGoogle />, colorScheme: "blackAlpha" },
  // { name: "twitter", icon: <FaTwitter />, colorScheme: "facebook" },
]
function SocialLogins({ handleSubmit }: Props): ReactElement {
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <Text mt="4" mb="2">
        Or login with
      </Text>
      <Flex flexDirection="column">
        {providers.map((provider) => {
          return (
            <Flex key={provider.name}>
              <Button
                onClick={() => {
                  setIsRedirecting(true)
                  onOpen()
                  handleSubmit(provider.name)
                }}
                colorScheme={provider.colorScheme}
                w="150px"
                mb="4"
              >
                {provider.icon} &nbsp;
                <Text>
                  {provider.name.replace(/^\w/, (t) => t.toUpperCase())}
                </Text>
              </Button>
            </Flex>
          )
        })}
      </Flex>
      {isRedirecting && <Redirecting isOpen={isOpen} onClose={onClose} />}
    </>
  )
}

export default SocialLogins
