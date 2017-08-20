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
                var counter=request.responseText;
                var dis= document.getElementById('count');
                dis.innerHTML=counter.toString();
            }
        }
    };
request.open('GET', 'http://arindammaitra97a81.imad.hasura-app.io/counter', true);
request.send(null);
};