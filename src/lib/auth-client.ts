import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "./auth"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    plugins: [
        inferAdditionalFields<typeof auth>()
    ]
})


// BETTER_AUTH_URL → server-side (Better Auth backend)
// NEXT_PUBLIC_BETTER_AUTH_URL → client-side (browser)