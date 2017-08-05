var button= document.getElementById("counter");
button.onclick= function()
{
    var request= new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readystate===XMLHttpRequest.DONE)
        {
            if (requeststatus===200)
            {
                var counter=request.responsetext;
                var span= document.getElementById("count");
                span.innerHTML=counter.toString();
            }
        }
    };
request.open('GET', "http://arindammaitra97a81.imad.hasura-app.io/counter", true);
request.send(null);
};