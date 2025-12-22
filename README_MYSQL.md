# MySQL Database Connection Setup

## 📋 Prerequisites

1. **MySQL Server** - Install MySQL on your system
   - macOS: `brew install mysql`
   - Windows: Download from [MySQL website](https://dev.mysql.com/downloads/mysql/)
   - Linux: `sudo apt-get install mysql-server`

2. **Node.js** - Version 14 or higher
   - Download from [nodejs.org](https://nodejs.org/)

## 🚀 Setup Instructions

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start MySQL Server

```bash
# macOS/Linux
mysql.server start

# Or check if it's already running
mysql.server status
```

### Step 3: Create Database

```bash
# Login to MySQL
mysql -u root -p

# Then run the SQL file
source database.sql

# Or import directly
mysql -u root -p < database.sql
```

### Step 4: Configure Database Connection

Edit `server.js` and update the database credentials:

```javascript
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // Your MySQL username
    password: 'yourpass',   // Your MySQL password
    database: 'web_lab_db'
});
```

### Step 5: Start the Server

```bash
npm start
```

Server will run on: `http://localhost:3000`

### Step 6: Open the Demo Page

Open `database-demo.html` in your browser or navigate to:
```
http://localhost:3000/database-demo.html
```

## 📡 API Endpoints

### GET Routes
- `GET /api/test` - Test server connection
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### POST Routes
- `POST /api/users` - Create new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

### PUT Routes
- `PUT /api/users/:id` - Update user
  ```json
  {
    "name": "John Updated",
    "email": "john.new@example.com"
  }
  ```

### DELETE Routes
- `DELETE /api/users/:id` - Delete user

## 🧪 Testing with cURL

```bash
# Test connection
curl http://localhost:3000/api/test

# Get all users
curl http://localhost:3000/api/users

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'

# Update user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated User","email":"updated@example.com"}'

# Delete user
curl -X DELETE http://localhost:3000/api/users/1
```

## 🐛 Troubleshooting

### Error: "Cannot connect to MySQL"
1. Check if MySQL is running: `mysql.server status`
2. Verify credentials in `server.js`
3. Ensure database exists: `SHOW DATABASES;` in MySQL

### Error: "ECONNREFUSED"
- Server is not running. Start with `npm start`

### Error: "ER_NOT_SUPPORTED_AUTH_MODE"
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

## 📚 Database Structure

### Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Students Table
```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    semester INT,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 Security Tips

1. Never commit passwords to Git
2. Use environment variables for sensitive data
3. Implement input validation
4. Use prepared statements (already implemented)
5. Add authentication middleware for production

## 📦 Project Structure

```
web_programming_lab/
├── server.js              # Express server with MySQL
├── package.json           # Dependencies
├── database.sql           # Database schema
├── database-demo.html     # Frontend demo
└── README_MYSQL.md        # This file
```

## 🎯 Next Steps

1. Add authentication (JWT)
2. Implement more complex queries
3. Add data validation
4. Create more tables
5. Add relationships between tables
6. Implement pagination
7. Add search functionality

## 📞 Support

For issues or questions, refer to:
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Express.js Guide](https://expressjs.com/)
- [Node MySQL2](https://github.com/sidorares/node-mysql2)
