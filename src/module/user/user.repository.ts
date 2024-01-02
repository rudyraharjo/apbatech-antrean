import pool from '../../config/dbConnect';
import { User } from '../../entities/User';

export class UserRepository {

    static async findByUsername(username: string | undefined): Promise<User | null> {
        const rows: any = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows.length ? rows[0] : null;
    }

    static async create(user: User): Promise<number> {
        const result: any = await pool.query('INSERT INTO users SET ?', [user]);
        return result.insertId;
    }
}
