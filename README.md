## Hangouts OnAir (static player)

### About
Allows you to embed the YouTube Live player for Hangouts on Air with a static URL. You don'T have to embed the code everytime you start a HOA. This script will handle that for you.

### Usage
**REQUIREMENT**

JQUERY:
```html 
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
```


Include the JavaScript file from your webserver or from GitHub

```html
<script type="text/javascript" src="hangoutonair.min.js"></script>
```

Add this part where the player should appear on your website and customize the size to your needs.

Also change the ID to the prefered YouTube channel name

```html
<hoaplayer id="_YOUTUBEID_" width="260" height="145"></hoaplayer>
```

**hoaplayer parameters:**
- id is your Youtube UserID
- width is your desired width for the player.
- height is your desired height for the player.

**Improtant Notes:**
 - Required ```jQuery```