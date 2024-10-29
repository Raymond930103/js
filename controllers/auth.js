const mysql = require("mysql");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE,
});

exports.register = (req, res) => {
    console.log(req.body);

    const {name, email, password, confirmPassword} = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) =>{
        if (error){
            console.log(error);
        }

        if (result.length > 0){
            return res.render('register', {
                message: 'That email has been taken'
            })
        } else if (password !== confirmPassword){
            return res.render('register', {
                message: 'Password do not match'
            })
        }

        let hashedpassword =await bcrypt.hash(password, 8)
        console.log(hashedpassword)
        db.query('INSERT INTO users SET ?', {name: name, email: email , password: hashedpassword}, (error, result) =>{
            if(error){
                console.log(error)
            }else{
                console.log(result)
                return res.render('register', {
                    message: 'Success!'
                })
            }
        })
        
    })

}