import { OAuthExtension } from "@magic-ext/oauth"
import { Magic } from "magic-sdk"

const createMagic = (key: string) => {
  if (typeof window !== "undefined") {
    return new Magic(key, {
      extensions: [new OAuthExtension()],
    })
  }
}

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!)
