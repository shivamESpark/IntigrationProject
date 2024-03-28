const express = require("express");
const app = express();
const {dbConnection} = require("./dbHandler/dbConnection");
const con = dbConnection();
const url = require("url");



app.set("view engine", "ejs");

app.use(express.json());

app.get("/", (req, res)=>{
    res.render("index");    
})

const dbData = require("./dbHandler/dbFetch");
app.use("/db", dbData);

const addUsers = require("./Routes/addUser");
app.use("/add", addUsers);

const password = require("./Routes/dbPass");
app.use("/activate", password);

const loginpage = require("./Routes/login");
app.use("/login", loginpage);




const dynamicTable = require("./Routes/dynamicTable/dynamicTable");
app.use("/dynamic", dynamicTable)

const eventsTable = require("./Routes/eventsTable/eventsTable");
app.use("/events", eventsTable);

const kukuCube = require("./Routes/kukuCube/kukuCube");
app.use("/kukucube", kukuCube);

const tickTackToe = require("./Routes/tickTackToe/tickTackToe");
app.use("/tickTacToe", tickTackToe);

const delimeterSearch = require("./Routes/delimeterSearch/delimeterSearch");
app.use("/delimetersearch", delimeterSearch);

const dynamicGried = require("./Routes/dynamicGrid/dynamicGrid");
app.use("/dynamicgrid", dynamicGried);




app.listen(8080);