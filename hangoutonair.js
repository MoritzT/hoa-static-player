/**
 * Title: Youtube Live Player (StaticHangouts)
 * Descriptions: Allows you to auto-embed your latest live broadcast
 * Developers: Robert Pitt, Moritz Tolxdorff.
 * Contact: Robert PItt <https://plus.google.com/110106586947414476573>
 * Contact: Moritz Tolxdorf <https://plus.google.com/117596712775912423303>
 *
 * Copyright: (C) 2012 Robert Pitt, Moritz Tolxdorff
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
(function(){
    /**
     * Boolean to deter if Dom has loaded
     * @private
    */
    var readyLoad_ = false;


    /**
     * @constructor
    */
    var HOAPlayer = function()
    {
        /**
         * Configuration Stack, can be modified by the main window
        */
        this.config = {
            defaultWidth : 560,
            defaultHeight : 315,
            playerFrameBorder : 0,
            allowFullScreen : true
        };

        /**
         * Merge the configuration object with any potential overwrites
        */
        this.config = this.mergeObjects(this.config, window["_hoa_config"] || {});

        /**
         * Bind documentReady event
        */
        this.bindOnload(this.onDomLoaded.bind(this));
    };

    /**
     * Callback fired when DOM is ready
    */
    HOAPlayer.prototype.onDomLoaded = function(e)
    {
        /**
         * Scan the DOM for all the elements that have the classname onair
        */
        var targets = document.getElementsByClassName('onair'), i;

        /**
         * Loop the targets and draw a video feed
        */
        for(i = 0; i < targets.length; i++)
        {
            /**
             * only apply the player if there is a data-uid attribute
            */
            if(targets[i].getAttribute('data-uid'))
            {
                var uid = targets[i].getAttribute('data-uid');
                var width = targets[i].getAttribute('data-width') || this.config.defaultWidth;
                var height = targets[i].getAttribute('data-height') || this.config.defaultHeight;

                /**
                 * Start the call for this element
                */
                this.loadVideoPlayer(targets[i], uid, width, height);
            }
        }
    }

    /**
     * Loads a video player form feed
     * @param target {Element} Target Element.
     * @param uid {String} Username of the feed
     * @param width {Number} width of the player
     * @param height {Number} height of the player
    */
    HOAPlayer.prototype.loadVideoPlayer = function(target, uid, width, height)
    {
        /**
         * Fetch the latest json feed for the current user
        */
        this.fetchUserFeed(uid, function(err, feed){

            /**
             * Get the last entry of the feed
            */
            var entry = feed.feed.entry[feed.feed.entry.length-1];

            /**
             * If there is an entry, parse the required information
            */
            if(entry && entry.content)
            {
                if(entry.yt$status.$t != "active" || entry.yt$status.$t != "completed"){
                 
                /**
                 * Parse the URL and split it into segments to get the last entity
                */
                var UrlParts = entry.content.src.split("/");

                /**
                 * Create an iframe
                */
                var iframe = document.createElement('iframe');

                /**
                 * Assign the param to the iframe
                */
                iframe.src = 'http://www.youtube.com/embed/' + UrlParts[UrlParts.length-1].split("?")[0];
                iframe.width = width;
                iframe.height = height;
                iframe.setAttribute("frameborder", this.config.playerFrameBorder);
                iframe.setAttribute("allowfullscreen", this.config.allowFullScreen);

                /**
                 * Replace the target node with the iframe node
                */
                target.parentNode.replaceChild(iframe, target);
            }
            }
        }.bind(this));
    }

    /**
     * Fetches a JSON Object from youtube for a specified uid
     * @param uid {String} Username of the feed
     * @param callback {Function(e, feed)} callback to be called
    */
    HOAPlayer.prototype.fetchUserFeed = function(uid, callback)
    {
        /**
         * Create a random function to assign to the global scope
        */
        var magic = '__YTLiveStreams_' + uid + "_" + Math.floor(Math.random() * 1000001);

        /**
         * Apply the callback to the root object (window)
        */
        this.awaitLoadResonse(magic, callback);

        /**
         * Build the URL
        */
        var URL = "https://gdata.youtube.com/feeds/api/users/" + uid + "/live/events?v=2&alt=json-in-script&callback=" + magic;

        /**
         * Create an script element to append to the head
        */
        var re = document.createElement('script');
        re.type = 'text/javascript';
        re.async = true;
        re.src = URL;

        /**
         * Prepend the element to the head of the document.
        */
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(re, s);
    }

    HOAPlayer.prototype.awaitLoadResonse = function(magic, callback)
    {
        window[magic] = function(payload)
        {
            /**
             * Here, I would like to do some error checking but not required
            */
            callback(null, payload);
        }
    }

    /**
     * Bind DOMReady callbacks to the dom (cross-browser)
     * @param callback {Function}, callback to be fired
     * @see https://github.com/dperini/ContentLoaded/blob/master/src/contentloaded.js
     * @see http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
    */
    HOAPlayer.prototype.bindOnload = function(callback)
    {
        /**
         * If the dom is already laoded just call the callback inline
        */
        if(readyLoad_ == true)
        {
            callback();
        }

        //Mozzilla, Opera and webkit support addEventListener
        if(document.addEventListener)
        {
            document.addEventListener( "DOMContentLoaded", function(){
                callback();
                readyLoad_ = true;
            }, false);

            return;
        }

        //IE
        if(document.attachEvent)
        {
            document.attachEvent("onreadystatechange", function(){
                if (document.readyState === "complete" ) {
                    callback();
                    readyLoad_ = true;
                }
            });

            return;
        }

        //Fallback to window.onload
        window.onload = callback;
    }

    /**
     * Merges {n} objects into a new object, i
     * @param * {Object}, Objects to be merged
    */
    HOAPlayer.prototype.mergeObjects = function()
    {
        var buildObject = {}, i, e;

        /**
         * Loop arguments, {obj1, obj2, obj3, ...}
        */
        for(i = 0; i < arguments.length; i++)
        {
            /**
             * Loop attributes of the current object
            */
            for(e in arguments[i])
            {
                /**
                 * Pass the key and value of the current object into the builldObject
                */
                buildObject[e] = arguments[i][e];
            }
        }

        return buildObject;
    }

    /**
     * Export an instantiated instance
    */
    window["_hoa_instance_"] = new HOAPlayer();
})()