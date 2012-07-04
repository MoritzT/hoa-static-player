## Hangouts OnAir (static player)

### About
Description here

### Usage

Describe how to embed the javascript

Include the JavaScript file from your webserver or from GitHub

```html
<script type="text/javascript" src="hangoutonair.js"></script>
```

Descripe how to call the showLivePlayer method.

Add this part where the player should appear on your website and customize the size to your needs.
Also change the Channelname to the prefered YouTube channel

```html
<script type="text/javascript" id="LivePlayer">showLivePlayer("DariaMusk", "560", "315");</script>
```

**showPlayer parameters:**
- First parameter is your Youtube UserID
- Second parameter is your desired width for the player.
- Second parameter is your desired height for the player.

**Improtant Notes:**
 - Required ```id="Liveplayer"```