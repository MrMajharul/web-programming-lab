const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files

// MySQL Connection Configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // Change this to your MySQL username
    password: '',           // Change this to your MySQL password
    database: 'web_lab_db'  // Change this to your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API Routes

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Get all records example
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});

// Get single record by ID
app.get('/api/users/:id', (req, res) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(results[0]);
    });
});

// Create new record
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    
    db.query(query, [name, email], (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.status(201).json({ 
            id: result.insertId, 
            name, 
            email,
            message: 'User created successfully' 
        });
    });
});

// Update record
app.put('/api/users/:id', (req, res) => {
    const { name, email } = req.body;
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    
    db.query(query, [name, email, req.params.id], (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ message: 'User updated successfully' });
    });
});

// Delete record
app.delete('/api/users/:id', (req, res) => {
    const query = 'DELETE FROM users WHERE id = ?';
    
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle server shutdown
process.on('SIGINT', () => {
    db.end((err) => {
        if (err) {
            console.error('Error closing database connection:', err);
        }
        console.log('Database connection closed');
        process.exit();
    });
});
