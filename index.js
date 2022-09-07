const express = require("express");  //npm install express
const exphbs = require("express-handlebars"); //npm install --save express-handlebars
const bodyParser = require("body-parser");//npm install --save body-parser
const flash = require("express-flash");// npm i express-flash
const session = require("express-session"); // npm install express-session
let app = express();


const pgp = require("pg-promise")();// npm i pg-promise
const UserNames = require("./price_plan");

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:pg1999@localhost:5432/pricesdb";

const config = {
  connectionString: DATABASE_URL,
 /*ssl: {
    rejectUnauthorized: false,
  },*/
};

const db = pgp(config);
const UsingNames = UserNames(db)


app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.use(
    session({
      secret: "string for session in http",
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(flash());
  app.set("view engine", "handlebars");
  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('index');
  });
app.get('/allocate', async function (req, res) {
    res.render('allocate', {myError: await UsingNames.returnError()});
  });


  app.get('/viewusers/:planType',async function (req, res) {
   // console.log(req.params.planType)
   //console.log(await UsingNames.namesFromDatabase(req.params.planType))
    res.render('viewusers', { UsersFor: await UsingNames.namesFromDatabase(req.params.planType)});
  });
  app.post('/sum',async function (req, res) {
    //await UsingNames.sumForUser(req.body.EnterMain, req.body.EnterMainString)
    res.redirect('/')
});


app.post('/UserDetails',async function (req, res) {
    await UsingNames.AllocatingPeople(req.body.Entername, req.body.planType)
    res.redirect('/allocate')
});
app.post('/reset',async function (req, res) {
    await UsingNames.resetAll()
    res.redirect('/allocate')
});


  let PORT = process.env.PORT || 4000;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});
