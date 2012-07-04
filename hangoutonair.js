(function(){
    /**
     * Private Variables and Functions
    */
    var XMLHttpFactories = [
		function () {return new XDomainRequest()},
		function () {return new XMLHttpRequest()},
		function () {return new ActiveXObject("Msxml2.XMLHTTP")},
		function () {return new ActiveXObject("Msxml3.XMLHTTP")},
		function () {return new ActiveXObject("Microsoft.XMLHTTP")}
    ];
                     
	function sendRequest(url, callback) {
        var req = createXMLHTTPObject();
        if (!req) return;
        
        var method = window.XDomainRequest ? "onload" : "onreadystatechange";
        req.open("GET", url, true);
        req[method] = function ()
        {
            if (req.readyState != 4) return;
            
            if (req.status != 200 && req.status != 304)
            {
                return;
            }
            
            callback(req);
        }
            
        if (req.readyState == 4) return;
        req.send();
    }
        
    function createXMLHTTPObject()
    {
        var xmlhttp = false;
        for (var i=0;i<XMLHttpFactories.length;i++)
        {
            try
            {
                xmlhttp = XMLHttpFactories[i]();
            }
            catch (e)
            {
                continue;
            }
            break;
        }
        
        return xmlhttp;
    }
                     
    function showLivePlayer(uid, w, h)
    {
        var url = "https://gdata.youtube.com/feeds/api/users/" + uid + "/live/events?v=2&prettyprint=true&alt=json";
        sendRequest(url, function(xhr){
        	if(xhr){
        		var data = JSON.parse(xhr.responseText);
	            var parts = data.feed.entry[data.feed.entry.length-1].content.src.split("/");
	            var vid = parts[parts.length-1].split("?")[0];
	            console.log(vid);
	            document.write('<iframe width="' + (w || 560) + '" height="' + (h || 315) + '" src="http://www.youtube.com/embed/' + vid + '" frameborder="0" allowfullscreen></iframe>');
        	}
        });
    }
    window["showLivePlayer"] = showLivePlayer;
})()