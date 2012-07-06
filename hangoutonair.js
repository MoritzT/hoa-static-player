(function(){
    /**
     * Private Variables and Functions
    */                     
    function sendRequest(url, params, callback) {
        var magic = '__YTLiveStreams_' + Math.floor( Math.random() * 1000001 ); 
        window[magic] = callback;
        params = params || {};
        params["callback"] = magic;
        var url_ = buildURL(url, params);
        var re = document.createElement('script'); re.type = 'text/javascript'; re.async = true;
        re.src = url_;
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(re, s);
    }
    
    function buildURL(url, params) {
        var pairs = [];
        for(var key in params)
        {
            if(!params.hasOwnProperty(key))
            {
            continue; 
            }

            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
        }
        return url + "?" + pairs.join("&");
    }
                     
    $(document).ready(function(){
        $('hoaplayer').each(function(){
            var uid = $(this).attr('id');
            var w = $(this).attr("width");
            var h = $(this).attr("height");
            var ref = $('#'+uid);
            var url = "https://gdata.youtube.com/feeds/api/users/" + uid + "/live/events";

            sendRequest(url, {alt:"json-in-script", v:"2"}, function(data){
                if(data){
                    var parts = data.feed.entry[data.feed.entry.length-1].content.src.split("/");
                    var vid = parts[parts.length-1].split("?")[0];
                    var iframe = document.createElement('iframe');

                    iframe.src = 'http://www.youtube.com/embed/' + vid;
                    iframe.width = (w || 560);
                    iframe.height = (h || 315);
                    iframe.setAttribute("frameborder", "0");
                    iframe.setAttribute("allowfullscreen", "true");
                    
                    ref.append(iframe);
                }
            });
        })
    })
})()