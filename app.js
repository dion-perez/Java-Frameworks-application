"use strict";

var express = require('express'); // load express
var app = express(); // create an instance of express
var expressLayouts = require('express-ejs-layouts'); // load express layouts
app.set("port", process.env.PORT || 3000); // port, I guess
app.set('view engine', 'ejs'); // use template engine ejs
app.use(expressLayouts); // use layouts
app.use(express.static("public")); // serve static files in public folder
// use body parser for processing URL encoded and JSON parameters (???? wtf is this)
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

const MongoDB = 
    require("mongodb").MongoClient,
    dbURL = "mongodb://localhost:27017", //mongodb's default port
    dbName = "aafuni_db";

console.log(MongoDB);
// Connect to aafuni_db from the connection to server
// Find all records in 'courses' collection, print them
MongoDB.connect(
    // {useUnifiedTopology: true},
    dbURL,
    (error, client) => {
        if (error) throw error;
        let db = client.db(dbName);
        db.collection("courses")
            .find()
            .toArray((error, data) => {
                if (error) throw error;
                console.log(data);
            });

        // Insert a record, to check if app is connecting to server
        db.collection("courses").insertOne({
                title: "BSc Hon Physics",
                code: "PH234",
                leader: {
                    name: "Dr Naomi Harris",
                    email: "n.harris@aaf.ac.uk",
                    office: "A-108"
                },
                modules: ["Atomic Physics", "Electromagnetism",
                    "Solid State Physics", "Particle Physics"
                ],
                department: "Science"
            },
            (error, db) => {
                if (error) throw error;
                console.log(db);
            }
        );
    }
);

// Gets for redirects to different pages
app.get('/home', (req, res) => {
    res.render("index.ejs"); // web side on localhost:3000/home
})

app.get('/about-us', (req, res) => {
    res.render("about-us.ejs");
})

var mainController = require("./controllers/mainController"); // controller required
app.get("/courses", mainController.showCourses);

app.listen(app.get("port"), () => {
    console.log(`AAF Express Server running at http://localhost:${app.get("port")}`);
});