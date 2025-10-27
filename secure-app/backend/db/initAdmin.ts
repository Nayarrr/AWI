import pool from './database.ts'
import bcrypt from 'bcryptjs'

export async function ensureAdmin() {
    const hashAdmin = await bcrypt.hash('admin', 10);
    const hashUser = await bcrypt.hash('user', 10)
    await pool.query(
        `INSERT INTO users (login, password_hash, role)
        VALUES ('admin', $1, 'admin')
        ON CONFLICT (login) DO NOTHING`,
        [hashAdmin]
    )
    await pool.query(
        `INSERT INTO users (login, password_hash, role)
        VALUES ('user', $1, 'user')
        ON CONFLICT (login) DO NOTHING`,
        [hashUser]
    )
    console.log('👍 Compte admin vérifié ou créé');
}