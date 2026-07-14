import { createAuthClient } from "better-auth/react"
import { jwtClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: "https://pizza-verse-sage.vercel.app",
    plugins: [jwtClient()]
})

export const { signIn, signUp, signOut, useSession, getSession } = authClient