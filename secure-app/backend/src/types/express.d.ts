import type { TokenPayload } from './token-payload.ts'
import type { userTocken } from './userToken.ts'

declare global {
    namespace Express { // on rajoute user au type Request de express
        interface Request {
            cookies?: Record<string, string> // pour aider VSCode (ds cookie-parser mais pas vu par VSCode)
            user?: userToken // il peut y avoir un req.user
        }
    }
}
// Nécessaire pour que TypeScript traite ce fichier comme un module
export {}