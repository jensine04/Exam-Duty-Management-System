const jwt = require('jsonwebtoken');

const express =require("express");
const mysql= require('mysql2');
const cors= require("cors");
const cookieParser = require('cookie-parser');
const path = require('path');
const multer = require('multer');

const app= express();

app.use(express.json());
app.use(cors( {
    origin: ["http://localhost:3000"],
    methods: ["POST , GET"],
    credentials: true,
}
));
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null,'public/images')
    },
    filename: (req,file,cb)=> {
        cb(null,file.fieldname + "_" + Date.now() +path.extname(file.originalname));
    }
})

const upload=multer({
    storage: storage
})

app.use(cookieParser());


const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "123dubai",
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

app.get('/upcoming',verifyUser,(req, res) => {
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

app.post('/checkbox',(req,res)=>{
    
    const { selectedRows, id } = req.body;
    const promises=selectedRows.map(row => {
    const sql = "UPDATE examdetails SET assigned = 1, t_id = ? WHERE assigned = 0 AND date = ? AND stime = ? AND etime=? LIMIT 1";
    const sql2 = "UPDATE teachers SET dutycount = dutycount + 1 WHERE teacher_id = ?";
    return new Promise((resolve, reject) => {
    console.log('row',row.stime,row.etime)
    db.query(sql, [id, row.date ,row.stime ,row.etime],(err,data)=>{
        if(err) 
        reject(err);
        //return res.json("Error updating row");
        else{
            console.log('1st succes?',row)

            db.query(sql2, [id],(err2,data2)=>{
                if(err2) 
                reject(err2);
                //return res.json("Error updating row");
                else{
                    console.log('2nd succes?',row)
                    //return res.json(data);
                    resolve(data2);
                }
            });


            //return res.json(data);
            resolve(data);
        }
    });

    })
})
})

app.post('/algo',(req,res)=>{
    const selectedRow = req.body; // Access the selected row data from the request body
    console.log('selected row',req.body)
    // Extract required fields from selected row
    const { date, stime, etime ,clas,nam} = selectedRow
    const sql ="SELECT teacher_id FROM teachers WHERE dutycount = (SELECT MIN(dutycount) FROM teachers) LIMIT 1;";
    const sql1 = "UPDATE examdetails SET assigned = 1, t_id = ? WHERE assigned = 0 AND date = ? AND stime = ? AND etime=? LIMIT 1";
    const sql2 = "UPDATE teachers SET dutycount = dutycount + 1 WHERE teacher_id = ?";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message: "Error in server"});
        else{
            console.log('1st succes')
            const teacherId = result[0].teacher_id;
            console.log('teacherid obtained',teacherId)
            db.query(sql1, [teacherId,date,stime,etime],(err1,data1)=>{
                if(err1) {
                console.error("Error updating examdetails:");
                    return res.json({ Message: "Error updating examdetails" });
                }
                //return res.json("Error updating row");
                else{
                    console.log('2nd succes?',teacherId,date,stime,etime)
                    db.query(sql2, [teacherId],(err3,data3)=>{
                        if(err3) {
                            console.error("Error updating examdetails:");
                                return res.json({ Message: "Error updating examdetails" });
                            }
                        //xyz
                        //return res.json("Error updating row");
                        else{
                            console.log('3rd succes?')
                            //return res.json(data);
                            //resolve(data3);
                        }
                    });
                    //return res.json(data);
                    //resolve(data1);
                }
            });
            return res.json(result);
        }
        
    })
}

)
app.post('/uploadimg',upload.single('image'),(req,res)=>{
    //console.log('file req',req);
    //const { selectedRows, id } = req.body;
    const image=req.file.filename;
    const exams = [];
    for (const key in req.body) {
        if (key.startsWith('series')) {
          const index = key.slice(6); // Extract index from the key
          exams.push({
            series: req.body[key],
            semester: req.body[`semester${index}`],
            startDate: req.body[`startDate${index}`]
          });
        }
      }
      console.log('Exams :',exams[0].series);
      console.log('image :',image);

    const sql ="INSERT INTO timetable (`examid`,`name`,`sem`,`sdate`,`ttimage`) Values (NULL,?,?,?,?)";
    //console.log('req body classroom',req.body.dutyDetails[0].classroom , req.body.dutyDetails[0].date , req.body.dutyDetails[0].startTime, req.body.dutyDetails[0].endTime);
    db.query(sql,[exams[0].series, exams[0].semester, exams[0].startDate,image],(err,result)=>{
         if(err){
            console.log('error inserting');
             return res.json({Message:"Error"});
              }
         else{
            console.log('inserted')
             return res.json({Status:"Success"});
         }
        
     })
})

app.post('/availabilitycontent',(req,res)=>{
    const sql ="SELECT date,stime,MIN(etime) AS etime FROM examdetails WHERE assigned = 0 GROUP BY date, stime, etime ORDER BY date, stime ";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message: "Error in server"});
        else{
            return res.json(result);
        }
        
    })
})

app.post('/examcontent',(req,res)=>{
    const sql ="SELECT * FROM timetable";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message: "Error in server"});
        else{
            return res.json(result);
        }
        
    })
})

app.post('/admindutycontent',(req,res)=>{
    const sql ="SELECT examdetails.date, examdetails.stime, examdetails.etime, examdetails.classroom, teachers.name FROM examdetails LEFT JOIN teachers ON teachers.teacher_id = examdetails.t_id ORDER BY examdetails.date, examdetails.stime;";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message: "Error in server"});
        else{
            return res.json(result);
        }
        
    })
})

app.post('/facultydutycontent',(req,res)=>{
    const sql ="SELECT * FROM examdetails WHERE t_id= ? ORDER BY date, stime";
    db.query(sql,[req.body.id],(err,result)=>{
        if(err) return res.json({Message: "Error in server"});
        else{
            return res.json(result);
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

