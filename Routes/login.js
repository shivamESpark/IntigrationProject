const express = require("express");
const routes = express.Router();
const {dbConnection} = require("../dbHandler/dbConnection");
const con = dbConnection();
const md5 = require("md5");

routes.get("/", (req, res)=>{
    res.render("login");
})


function randomStringGenerator(size){
    const str = 'ABCDEFGHIJKLMNOPQRSTUWVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let rStr = "";
    for(let i=0; i<size; i++){
        const n = Math.round(Math.random() * str.length);
        rStr += str[n];
    }
    return rStr;
}

function routeToHomeCreation(accessLink){
    // console.log(`/homepage/${accessLink}`)
    routes.get(`/homepage/${accessLink}`, (req,res)=>{
        accessLink = `http://localhost:8080/homepage/${accessLink}`
        res.render("homepage");
    });
}




routes.post("/", (req, res)=>{
    const data = req.body;
    const email = data.email;
    const pswd = data.password;

    const sqlVarify = `select email, salt, passwords, active from users where email = "${email}"`;
    con.query(sqlVarify, (err, result)=>{
        if(err){
            console.log(err + " while retving password");
        } else {
            if(result.length > 0){
                const pswdMd5 = md5(pswd + result[0].salt);
                const pswdEnc = result[0].passwords;
                // console.log(pswdEnc, pswdMd5);
                if(pswdEnc == pswdMd5 && email == result[0].email){
                    const rstr = randomStringGenerator(32);
                    const alink = `http://localhost:8080/login/homepage/${rstr}`;
                    // console.log(rstr, "loggedin")
                    routeToHomeCreation(rstr);
                    res.send({status:200, alink : alink});
                } else {
                    res.send({status:3001});
                }
            }
        }
    })
    
});

module.exports = routes;