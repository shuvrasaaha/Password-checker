import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser"
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;
var password = "ILoveProgramming";
var userGivenPassword = "";
var userIsAuthorised = false;

app.use(bodyParser.urlencoded({extended: true}));

function passwordChecker(req, res, next) {
    console.log(req.body);
    userGivenPassword = req.body["password"];
    if(userGivenPassword === password){
        userIsAuthorised = true;
        }
        next();

    };

app.use(passwordChecker);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})


app.post("/check", (req, res) => {
    if (userIsAuthorised) {
      res.sendFile(__dirname + "/public/secret.html");
    } else {
      res.sendFile(__dirname + "/public/index.html");
      //Alternatively res.redirect("/");
    }
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
