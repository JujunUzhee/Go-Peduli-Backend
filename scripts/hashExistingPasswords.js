import bcrypt from 'bcrypt';
import { query } from "../database/db.js";

const hashExistingPasswords = async () => {
    try {
        const users = await query('SELECT id, username, password FROM login');
        
        for (const user of users) {
            if (user.password.length !== 60 || !user.password.startsWith('$2b$')) {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(user.password, saltRounds);

                await query('UPDATE login SET password = ? WHERE id = ?', [hashedPassword, user.id]);

                console.log(`Password untuk user ${user.username} telah di-hash dan diperbarui di database.`);
            } else {
                console.log(`Password untuk user ${user.username} sudah di-hash.`);
            }
        }

        console.log('Proses hashing password selesai.');
    } catch (error) {
        console.error('Error hashing passwords:', error);
    }
};


hashExistingPasswords();
