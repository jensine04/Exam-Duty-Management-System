const jwt = require('jsonwebtoken');

const express =require("express");
const mysql= require('mysql2');
const cors= require("cors");
const cookieParser = require('cookie-parser');

const app= express();

app.use(express.json());
app.use(cors( {
    origin: ["http://localhost:3000"],
    methods: ["POST , GET"],
    credentials: true,
}
));
app.use(cookieParser());


const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "Angel@jan8",
    database: "edms",
});
db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:');
    } else {
        console.log('Connected to MySQL database');
    }
});

const verifyUser= (req,res,next) =>{
    const token =req.cookies.token;
    if(!token){
        return res.json({Message: "Need token, provide."})
    }
    else {
        jwt.verify(token,"our-jsonwebtoken-secret-key",(err,decoded) => {
            if (err){
                return res.json({Message: "Authentication error"})
            }
            else{
                req.name = decoded.name;
                req.department = decoded.department;
                req.id = decoded.id;
                next();
            }
        })
    }
}

app.get('/facultypage',verifyUser,(req, res) => {
    return res.json({Status: "Success",name: req.name, department: req.department, id:req.id})
})
app.get('/availability',verifyUser,(req, res) => {
    return res.json({Status: "Success",name: req.name, department: req.department, id:req.id})
})

app.get('/admindashboard',verifyUser,(req, res) => {
    return res.json({Status: "Success",name: req.name, department: req.department, id:req.id})
})

app.post('/facultylogin',(req,res)=>{
    const sql ="SELECT * FROM teachers WHERE username = ? AND password= ?";
   
    db.query(sql,[req.body.username , req.body.password],(err,data)=>{
        if(err) return res.json("Error");
        if (data.length>0){
            // const payload = {
            //     id: data[0].teacher_id,
            //     name: data[0].name,
            //     department: data[0].department
            // };
            const name=data[0].name;
            const department=data[0].department;
            const id=data[0].teacher_id;
            console.log(data);
            const token = jwt.sign({name,department,id},"our-jsonwebtoken-secret-key",{expiresIn: '1d'});
            res.cookie('token',token);
            return res.json({Status: 'Success'});

        }
        else{
            return res.json({Status: 'Failed'});
        }
        
    })
})

app.post('/adminlogin',(req,res)=>{
    const sql ="SELECT * FROM admin WHERE username = ? AND password= ?";
   
    db.query(sql,[req.body.username , req.body.password],(err,data)=>{
        if(err) return res.json("Error");
        if (data.length>0){
            const name=data[0].name;
            const department=data[0].department;
            const id=data[0].admin_id;
            const token = jwt.sign({name,department,id},"our-jsonwebtoken-secret-key",{expiresIn: '1d'});
            res.cookie('token',token);
            return res.json({Status: 'Success'});
        }
        else{
            return res.json({Status: 'Failed'});
        }
        
    })
})

app.post('/dutydetails',(req,res)=>{
    const sql ="INSERT INTO examdetails (`sl_no`,`classroom`,`date`,`stime`,`etime`) Values (NULL,?,?,?,?)";
    console.log('req body classroom',req.body.dutyDetails[0].classroom , req.body.dutyDetails[0].date , req.body.dutyDetails[0].startTime, req.body.dutyDetails[0].endTime);
    db.query(sql,[req.body.dutyDetails[0].classroom , req.body.dutyDetails[0].date , req.body.dutyDetails[0].startTime, req.body.dutyDetails[0].endTime],(err,data)=>{
        if(err) return res.json("Error");
        else{
            return res.json(data);
        }
        
    })
})

app.get('/logout',(req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"})
})

app.listen(3001, () => {
    console.log("running server");
});

