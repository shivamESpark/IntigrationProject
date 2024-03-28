const express = require("express");
const md5 = require("md5");
const routes = express.Router();
const {dbConnection} = require("../dbHandler/dbConnection");
const con = dbConnection();


routes.post("/", (req, res)=>{
    const data = req.body;
    const cPass = data.cPass;
    const pPass = data.pPass;
    const id = data.id;

    let salt = undefined;

    console.log(data)
    if(cPass == pPass){
        const saltSql = `select salt from users where id = ${id}`;
        con.query(saltSql, (err, result)=>{
            if(err){
                console.log(err + " while fetchig the salt");
                res.send({status : 2002});
            } else {
                salt = result[0].salt
                const password = md5(pPass + salt);
                console.log(password);
                const pSql = `update users set passwords = "${password}", active = ${1} where id = ${id}`;
                con.query(pSql, (err, result)=>{
                    if(err){
                        console.log(err + " while updating the password");
                        res.send({status:2000});
                    } else {
                        res.send({status:200});
                    }
                })
            }
        })
    } else {
        console.log("both passwords are not same");
        res.send({status:2003});
    }
});

module.exports = routes;