## Hangouts OnAir (static player)

### About
Allows you to embed the YouTube Live player for Hangouts on Air with a static URL. You don'T have to embed the code everytime you start a HOA. This script will handle that for you.

### Usage

Include the JavaScript file in your website

```html
<script type="text/javascript" src="hangoutonair.min.js"></script>
```

Add this part where the player should appear on your website and customize the size to your needs.

Also change the data-uid to the prefered YouTube channel name

```html
<div class="onair" data-uid="YOUTUBEID" data-width="260" data-height="145"></div>
```

**hoaplayer parameters:**
- id is your Youtube UserID
- data-width is your desired width for the player. (Optional)
- data-height is your desired height for the player. (Optional)