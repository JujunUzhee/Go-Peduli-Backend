import { query } from "../database/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const SECRET_KEY = process.env.SECRET_KEY;

const loginUser = async (req, res) => {
    console.log('Login request received');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    console.log('Received username:', username);
    console.log('Received password:', password);

    const sql = "SELECT * FROM login WHERE username = ?";
    
    try {
        const users = await query(sql, [username]);
        console.log('Users found:', users);

        if (users.length === 0) {
            console.log('No users found with this username');
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = users[0];
        console.log('User found:', user);

        console.log('Comparing password:', password);
        console.log('With hash:', user.password);

        const validPassword = await bcrypt.compare(password, user.password);
        console.log('Password valid:', validPassword);

        if (!validPassword) {
            console.log('Password does not match');
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { loginUser };