import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import React, { ReactElement, useState } from "react"
import { IoIosPaperPlane } from "react-icons/io"

interface Props {
  disabled: boolean
  handleSubmit: (email: string) => Promise<void>
}

function EmailForm({ disabled, handleSubmit }: Props): ReactElement {
  const [email, setEmail] = useState<string>("")

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit(email)
      }}
    >
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <InputGroup>
          <Input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="beautiful@xyz.com"
            variant="filled"
          />
          <InputRightElement>
            <Button
              disabled={disabled}
              type="submit"
              p="0"
              colorScheme="purple"
            >
              <IoIosPaperPlane size="20px" />
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  )
}

export default EmailForm
