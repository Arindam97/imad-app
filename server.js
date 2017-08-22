var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var articleOne={
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

app.get('/article-one', function (req, res) {
  res.send(createTemplate(articleOne));
});

app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var counter= 0;
app.get('/counter', function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var names=[];
app.get("/submit-name", function(req, res){
   var name=req.query.name;
   
   names.push(name);
   res.send(JSON.stringify(names));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
