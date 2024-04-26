const express =require("express");
const mysql= require('mysql2');
const cors= require("cors");

const app= express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "password",
    database: "edms",
});
db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:');
    } else {
        console.log('Connected to MySQL database');
    }
});

app.post('/facultylogin',(req,res)=>{
    const sql ="SELECT * FROM teachers WHERE username = ? AND password= ?";
   
    db.query(sql,[req.body.username , req.body.password],(err,data)=>{
        if(err) return res.json("Error");
        if (data.length>0){
            return res.json('Login Successful');
        }
        else{
            return res.json('Login Failed');
        }
        
    })
})

app.listen(3001, () => {
    console.log("running server");
});

