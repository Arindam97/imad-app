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

var nameIn= document.getElementById('nameID');
var name=nameIn.value;
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
                var names=request.responseText;
                names= JSON.parse(names);
                var list='';
                for( var i=0; i<names.length; i++)
                {
                list +='<li>'+names[i]+'</li>';
                }
                var ul=document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
    };
request.open('GET', 'http://arindammaitra97a81.imad.hasura-app.io/submit-name?name='+ name, true);
request.send(null);
};