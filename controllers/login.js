const mysql = require("mysql");
const bcrypt = require("bcryptjs");

// Database connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

exports.login = (req, res) => {
    const { email, password } = req.body;

    console.log("Login attempt with email:", email);  // Log email input

    // Query the database for the user's email
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.error("Database query error:", error);  // Log any database errors
            return res.status(500).render('login', {
                message: 'Server error. Please try again later.'
            });
        }

        console.log("Database query result:", results);  // Log the query result

        if (results.length === 0) {
            console.log("Email not found in database.");  // Log if email doesn't exist
            return res.status(401).render('login', {
                message: 'Email not found.'
            });
        }

        const user = results[0];
        console.log("User data retrieved:", user);  // Log the retrieved user data

        // Compare the hashed password with the input password
        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Password match status:", isMatch);  // Log whether the password matched

        if (!isMatch) {
            console.log("Incorrect password entered.");  // Log if the password is incorrect
            return res.status(401).render('login', {
                message: 'Incorrect password.'
            });
        }

        // If login is successful, redirect to the order page
        console.log("Login successful! Redirecting to the order page.");  // Log success
        res.status(200).redirect('/order');
    });
};
