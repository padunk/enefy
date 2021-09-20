import React, { ReactElement, useContext } from "react"
import { Loading } from "../components"
import { UserContext } from "../lib/UserContext"

interface Props {}

function Profile({}: Props): ReactElement {
  const [user] = useContext(UserContext)!

  return (
    <>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <>
            <p>email: {user.email}</p>
            <p>id: {user.issuer}</p>
          </>
        )
      )}
    </>
  )
}

export default Profile
