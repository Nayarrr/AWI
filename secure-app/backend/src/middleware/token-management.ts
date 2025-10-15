import type { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import type { userToken } from '../types/userToken.ts'
import { JWT_SECRET, JWT_EXPIRATION, REFRESH_EXPIRATION } from '../config/env.ts';

// --- Fonctions de création et de vérification des tokens ---

export function createAccessToken(user: userToken) {
    return jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRATION })
}
export function createRefreshToken(user: userToken) {
    return jwt.sign(user, JWT_SECRET, { expiresIn: REFRESH_EXPIRATION })
}
export function verifyToken(req: Express.Request, res: Response, next: NextFunction) {
    const token = req.cookies?.access_token
    if (!token) { 
        return res.status(401).json({ error: 'Token manquant' }) 
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as userToken
        req.user = decoded
        next()
    } catch {
        res.status(403).json({ error: 'Token invalide ou expiré' })
    }
}