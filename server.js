var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;

var config= {
    user: 'arindammaitra97a81',
    database: 'arindammaitra97a81',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD,
};

var app = express();
app.use(morgan('combined'));

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

 var   articles= {
    'article-one': {
        title: 'Black Holes | Arindam',
        heading: 'Black Holes',
        date: 'August,5 2017',
        content: `<p>
                    A <i><b>black hole</b></i> is a region of spacetime exhibiting such strong gravitational effects that nothing—not even particles and electromagnetic radiation such as light—can escape from inside it.The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole.The boundary of the region from which no escape is possible is called the event horizon. Although the event horizon has an enormous effect on the fate and circumstances of an object crossing it, no locally detectable features appear to be observed. In many ways a black hole acts like an ideal black body, as it reflects no light.Moreover, quantum field theory in curved spacetime predicts that event horizons emit Hawking radiation, with the same spectrum as a black body of a temperature inversely proportional to its mass. This temperature is on the order of billionths of a kelvin for black holes of stellar mass, making it essentially impossible to observe.
                </p>
                
                
                
                
                <p>
                    <i><b>Black holes</b></i> of stellar mass are expected to form when very massive stars collapse at the end of their life cycle. After a black hole has formed, it can continue to grow by absorbing mass from its surroundings. By absorbing other stars and merging with other black holes, supermassive black holes of millions of solar massesmay form. There is general consensus that supermassive black holes exist in the centers of most galaxies.
                </p>
                
                
                
                <p>
                    On 11 February 2016, the <i><b>LIGO</b></i> collaboration announced the first observation of gravitational waves; because these waves were generated from a black hole merger it was the first ever direct detection of a binary black hole merger. On 15 June 2016, a second detection of a gravitational wave event from colliding black holes was announced.
                </p>`,
        wiki: '<a href="https://en.wikipedia.org/wiki/Black_hole">',
    },
    'article-two': {
        title: 'QED | Arindam',
        heading: 'QUANTUM ELECTRODYNAMICS',
        date: 'August,6 2017',
        content: ` <p>
                    In particle physics, <i><b>QUANTUM ELECTRODYNAMICS(QED)</b></i> is the relativistic quantum field theory of electrodynamics. In essence, it describes how light and matter interact and is the first theory where full agreement between quantum mechanics and special relativity is achieved. QED mathematically describes all phenomena involving electrically charged particles interacting by means of exchange of photons and represents the quantum counterpart of classical electromagnetism giving a complete account of matter and light interaction.
                </p>
                
                
                
                
                <p>
                   In technical terms, <i><b>QED</b></i> can be described as a perturbation theory of the electromagnetic quantum vacuum. Richard Feynman called it "the jewel of physics" for its extremely accurate predictions of quantities like the anomalous magnetic moment of the electron and the Lamb shift of the energy levels of hydrogen.
                </p>
                
                
                
                <p>
                    Near the end of his life, <i><b>Richard P. Feynman</b></i> gave a series of lectures on QED intended for the lay public. These lectures were transcribed and published as Feynman (1985), QED: The strange theory of light and matter,a classic non-mathematical exposition of QED from the point of view articulated below.
                        The key components of Feynman's presentation of QED are three basic actions:
                </p>
                        <ol>
                        <li>A photon goes from one place and time to another place and time.</li>
                        <li>An electron goes from one place and time to another place and time.</li>
                        <li>An electron emits or absorbs a photon at a certain place and time.</li>
                        </ol>`,
        wiki: '<a href="https://en.wikipedia.org/wiki/Quantum_electrodynamics">',
    },
    'article-three': {
    title: 'String Theory | Arindam',
    heading: 'String Theory',
    date: 'August,7 2017',
    content: `<p>
                In physics, <i><b>String Theory</b></i> is a theoretical framework in which the point-like particles of particle physics are replaced by one-dimensional objects called strings. It describes how these strings propagate through space and interact with each other. On distance scales larger than the string scale, a string looks just like an ordinary particle, with its mass, charge, and other properties determined by the vibrational state of the string. In string theory, one of the many vibrational states of the string corresponds to the graviton, a quantum mechanical particle that carries gravitational force. Thus string theory is a theory of quantum gravity.
            </p>
            
            
            
            
            <p>
                <i><b>String theory</b></i> is a broad and varied subject that attempts to address a number of deep questions of fundamental physics. String theory has been applied to a variety of problems in black hole physics, early universe cosmology, nuclear physics, and condensed matter physics, and it has stimulated a number of major developments in pure mathematics. Because string theory potentially provides a unified description of gravity and particle physics, it is a candidate for a theory of everything, a self-contained mathematical model that describes all fundamental forces and forms of matter. Despite much work on these problems, it is not known to what extent string theory describes the real world or how much freedom the theory allows to choose the details.
            </p>
            
            
            
            <p>
                <i><b>String theory</b></i> was first studied in the late 1960s as a theory of the strong nuclear force, before being abandoned in favor of quantum chromodynamics. Subsequently, it was realized that the very properties that made string theory unsuitable as a theory of nuclear physics made it a promising candidate for a quantum theory of gravity. The earliest version of string theory, bosonic string theory, incorporated only the class of particles known as bosons. It later developed into superstring theory, which posits a connection called supersymmetry between bosons and the class of particles called fermions. Five consistent versions of superstring theory were developed before it was conjectured in the mid-1990s that they were all different limiting cases of a single theory in eleven dimensions known as M-theory. In late 1997, theorists discovered an important relationship called the AdS/CFT correspondence, which relates string theory to another type of physical theory called a quantum field theory.
            </p>`,
    wiki: '<a href="https://en.wikipedia.org/wiki/String_theory">',
}
};

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
                        ${date}
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
    var articleName=req.params.articleName;
    pool.query("SELECT * FROM article WHERE webTitle= '"+parseInt(req.params.articleName)+"'", function(err, result){
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
