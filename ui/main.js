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

var nameIn= document.getElementById('name');
var name=nameIn.value;
var submit= document.getElementById('submit_btn');
submit.onclck= function()
{
    var names=['name1', 'name2', 'name3', 'name4'];
    var list='dddddd ';
    for( var i=0; i<names.length; i++)
    {
    list +='<li>'+names[i]+'</li>';
    }
var ul=document.getElementById('namelist');
ul.innerHTML=list;
};