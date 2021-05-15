const express = require("express");
const app = express();
const mysql = require("mysql2");
require('dotenv').config()
const cors = require('cors')

const PORT = process.env.PORT || 7000
const dbconn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "welbex",
});

app.use(cors())
app.use(express.json({extended: true}))
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`express listen ${PORT}`);
});

app.get('/', function (request, response) {
    res.render('./client/public/index.html')
})

app.get("/api/items", function (request, response) {
    const dbConnection = new Promise(function (resolve, reject) {
        dbconn.query(
            `SELECT * FROM test;`,
            (error, result) => {
                error ? reject(error) : resolve(result);
            }
        )
    })
    dbConnection.then(result => {
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.write(JSON.stringify(result))
        console.log('response 200')
        response.end()

    })
})

app.post("/api/items", function (request, response) {
    const {column, condition, meaning} = request.body

    const dbConnection = new Promise(function (resolve, reject) {

        function checkParams(queryString) {
            return dbconn.query(`SELECT * FROM test WHERE ${queryString};`,
                (error, result) => {
                    error ? reject(error) : resolve(result);
                }
            )
        }

        switch (column) {
            case 'title':
                checkParams(`${column} ${condition} "%${meaning}%"`)
            default:
                checkParams(`${column} ${condition} ${meaning}`)
        }


    })
    dbConnection.then(result => {
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.write(JSON.stringify(result))
        console.log('response 200')
        response.end()

    })
})


