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
                console.log("user logged in");
                alert("USER LOGGED IN");
            }else if(request.status===500){
                alert("SOMETHING HAPPENED ON THE SERVER, WE ARE SORRY FOR THE INCONVINENCE");
            }else if(request.status===403){
                alert("WRONG PASSWORD FOR THE ENTERED USER");
            }else if(request.status===404){
                alert("USER NOT FOUND");
            }
        }
    };
var username= document.getElementById('username').value;
var password= document.getElementById('password').value;
console.log(username);
console.log(password);
request.open('POST', 'http://arindammaitra97a81.imad.hasura-app.io/login', true);
request.setRequestHeader('Content-Type', 'application/json').open();
request.send(JSON.stringify({username: username, password: password}));
};