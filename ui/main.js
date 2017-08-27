var button= document.getElementById('counter');
button.onclick= function()
{
    var request= new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if (request.status===200)
            {
                var counte=request.responseText;
                var dis= document.getElementById('count');
                dis.innerHTML=counte.toString();
            }
        }
    };
request.open('GET', 'http://arindammaitra97a81.imad.hasura-app.io/counter', true);
request.send(null);
};

var submit= document.getElementById('submit_btn');
submit.onclick= function()
{
     var request= new XMLHttpRequest();
     request.onreadystatechange=function()
     {
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if (request.status===200)
            {
                
            }
        }
    };
var username= document.getElementById('username').value;
var password= document.getElementById('password').value;
request.open('POST', 'http://arindammaitra97a81.imad.hasura-app.io/login', true);
request.send(null);
};