const express = require("express");
const routes = express.Router();
const {dbConnection} = require("../dbHandler/dbConnection");
const con = dbConnection();


let activeLinkStatus = 1;

function randomStringGenerator(size){
    const str = 'ABCDEFGHIJKLMNOPQRSTUWVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let rStr = "";
    for(let i=0; i<size; i++){
        const n = Math.round(Math.random() * str.length);
        rStr += str[n];
    }
    return rStr;
}


function routeToPasswordCreation(accessLink, lid){
    setTimeout(() => {
        activeLinkStatus = 0;
    }, 10000);

    if(activeLinkStatus == 1){
        routes.get(`/createPassword/${accessLink}/:${lid}`, (req,res)=>{
            res.render(`createPassword`);
        })
    } else {
        const newRandomStr = randomStringGenerator(32);
        routes.get(`/createPassword/${newRandomStr}/:${lid}`, (req,res)=>{
            res.render(`newPassword`, {rstr:newRandomStr, uid:lid});
        })
    }
}

routes.post("/", (req, res)=>{
    const data = req.body;
    const fname = data.fname;
    const lname = data.lname;
    const email = data.email;
    const dob = data.dob;
    const gender = data.gender;
    
    const salt = randomStringGenerator(4).slice(0,4);   
    // console.log(data)
    
    auSql = `select id, email from users where email = "${email}" and active = 0`;
    con.query(auSql, (err, result)=>{
        if(err){
            console.log("Error While Checking inactive users", err);
            return err;
        } else {
            if(result.length != 0){
                const accessLink = randomStringGenerator(32);
                const uid = result[0].id;
                routeToPasswordCreation(accessLink, uid);
                res.send({status:2007, alink:accessLink, uid:uid});
                return;
            } else {
                cSql = `select email from users where email = "${email}"`;
                con.query(cSql, (err, result)=>{
                    if(err){
                        console.log("Error While Checking Email", err);
                        return err;
                    } else {
                        if(result.length > 0){
                            res.send({status:1000});
                        } else {
                            
                            isql = `insert into users(fname, lname, email, dob, gender, salt) values (?,?,?,?,?,?)`;
                            con.query(isql, [fname, lname, email, dob, gender, salt], (err, result)=>{
                                if(err){
                                    console.log(err + " while inserting!")
                                } else {

                                    console.log("Data inserted Successfully");
                                    const accessLink = randomStringGenerator(32);
                                    const lastInsertedId = result.insertId;
                                    routeToPasswordCreation(accessLink, lastInsertedId);
                                    res.send({status:200, alink:accessLink, uid:lastInsertedId});
                                }
                            })
                        }
                    }
                });
            }
        }   
    });
});

module.exports = routes;