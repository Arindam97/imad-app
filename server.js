var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var crypto= require('crypto');
var bodyParser= require('body-parser');
var session= require('express-session');

var config= {
    user: 'arindammaitra97a81',
    database: 'arindammaitra97a81',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD,
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'aRandomStringToProtectMyselfFromDangersLikeYou',
    cookie: {maxage: 1000*60*60*24*30},
    auth: ''
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter= 0;
app.get('/counter', function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

var names=[];
app.get("/submit-name", function(req, res){
   var name=req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});


var pool= new Pool(config);
app.get('/test-db', function(req, res){
    pool.query('SELECT * FROM TEST',function(err, result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
});

function hash(input,salt){
    var hashed= crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf2','10000', salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req,res){
    var hashedString= hash(req.params.input, 'salted-string-that-is-very-good-for-health');
    res.send(hashedString);
});

app.post('/create-user', function(req,res){
    var username= req.body.username;
    var password= req.body.password;
    var salt= crypto.randomBytes(128).toString('hex');
    var dbString= hash(password, salt) ;
    pool.query('INSERT INTO "user" (username, password) VALUES($1,$2)', [username, dbString], function(err, result){
       if(err){
            res.status(500).send(err.toString());
        } else{
            res.send("User "+username+" Sucessfully Created");
        }
   });
});


//login 

app.post('/login', function(req,res){
    var username= req.body.username;
    var password= req.body.password;
    pool.query('SELECT * FROM "user" WHERE  username= $1', [username], function(err, result){
       if(err){
            res.status(500).send(err.toString());
        } else{
            if(result.rows.length===0){
                res.status(404).send("USENAME IS INVALID");
            }else{
                var dbString= result.rows[0].password;
                var salt= dbString.split('$')[2];
                var hashedPassword= hash(password, salt);
                if(hashedPassword === dbString)
                {
                     req.session.auth={userId: result.rows[0].id};
                     res.send("USER SUCCESSFULLY VERIFIED");
                }else{
                    console.log("NANANANANANANA");
                    res.status(403).send("WROG PASSWORD BITCH");
                    }
            }
        }
   });
});

// end login

app.get('/check-login', function(req,res){
   if(req.session && req.session.auth && req.session.auth.userId){
       res.send("You are user number "+ req.session.auth.userId.toString());
   }
   else{
       res.send("YOU ARE NOT LOGGED IN");
   }
});

function createTemplate(data){
    
    var title= data.title;
    var date= data.date;
    var wiki= data.wiki;
    var heading= data.heading;
    var content= data.content;
        var htmlTemplate= `<html>
            <head>
                <title>
                   ${title}
                </title>
                <meta name="viewport" content="width=device-width initial-scale=1"/>
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body style="background-color: #71757a">
                <div>
                    <a href="/"><h3 align="right">HOME</h3></a>
                </div>
                <hr/>
                <div class="contain">
                    <p align="center" style="color: yellow">
                        ${date.toDateString()}
                    </p>
                <hr/>
                <h3 align="center" style="color:#e90101;">
                    <u>${heading}</u>
                </h3>
                <div>
                    ${content}
                </div>
                <hr/>
                
                
                
                
                </div>
                <hr/>
                <div class="container">
                    <h1 align=center>
                            ${wiki}<img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png" alt="WIKIPEDIA" style="width:50px;height:50px;"></a><img src="http://exchangedownloads.smarttech.com/public/content/91/91ff873d-10d9-4f89-859b-d8561663d40e/previews/medium/0001.png" style="width:50px;height:50px;">                         <a href="https://www.facebook.com/arindam.maitra.71"><img src="https://blog.addthiscdn.com/wp-content/uploads/2015/11/logo-facebook.png" alt="FACEBOOK" style="width:50px;height:50px;"></a>
                    <img src="http://exchangedownloads.smarttech.com/public/content/91/91ff873d-10d9-4f89-859b-d8561663d40e/previews/medium/0001.png" style="width:50px;height:50px;">
                    <a href="https://www.instagram.com/?hl=en"><img src="https://lh3.googleusercontent.com/aYbdIM1abwyVSUZLDKoE0CDZGRhlkpsaPOg9tNnBktUQYsXflwknnOn2Ge1Yr7rImGk=w300" alt="INSTAGRAM" style="width:50px;height:50px;"></a>
                    </h1>
                </div>
            </body>
        </html>`;
        return htmlTemplate;
}

app.get('/articles/:articleName', function (req, res) {
    pool.query("SELECT * FROM article WHERE web= $1",[req.params.articleName], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length===0){
                res.status(404).send("REQUESTED FILE NOT FOUND");
            }else{
                var articleData=result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
