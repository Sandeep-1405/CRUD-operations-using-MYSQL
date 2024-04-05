const express = require("express");
const cors  = require("cors");
const mysql = require("mysql");

const app = express(); 
app.use(express.json())

app.use(cors());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"registration"
})

app.get("/",(req, res) =>{
    const sql = "SELECT * FROM users";
    db.query(sql,(err,data)=>{
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post('/create',(req,res)=>{

    const getemail = "Select Email from users where Email = ?"

    db.query(getemail,req.body.email,(err,data)=>{
        if (err){
            return res.json("Error")
        }else if (data.length !=0){
            return res.json("Email Already Exist")
        }else{
            const sql = "INSERT INTO users (`Name`,`Email`,`DOB`) VALUES (?) ";
    
            const values = [
                req.body.name,
                req.body.email,
                req.body.dob
            ]
            db.query(sql,[values],(err,data) =>{
                if (err) return res.json("Error");
                return res.json(data);
            })
        }
    })

})

app.put('/update/:id',(req,res)=>{
    const sql = "update users set `Name` = ?, `Email`= ?,`DOB` = ? where ID = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.dob
    ]
    const id = req.params.id

    db.query(sql,[...values,id],(err,data) =>{
        if (err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/user/:id',(req,res)=>{
    const sql = "DELETE FROM users where ID = ?";
    
    const id = req.params.id

    db.query(sql,[id],(err,data) =>{
        if (err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(8081, ()=>{
    console.log("Listening")
})