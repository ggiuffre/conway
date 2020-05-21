# Conway's Game of Life

A JavaScript implementation of Conway's
[Game of Life](https://www.conwaylife.com/wiki/Conway%27s_Game_of_Life)
with a simple HTML canvas.



## Usage

Download <a href="https://raw.githubusercontent.com/ggiuffre/conway/master/conway.js" download>`conway.js`</a>
from this repository.

Add an HTML `canvas` element and a `script` element pointing to `conway.js`:

```html
<canvas id="conway">Stop using IE 8!</canvas>
<script type="text/javascript" src="conway.js"></script>
```

Fire up the game with this additional `script`:

```html
<script type="text/javascript">
	const canvas = document.querySelector('#conway');
	const width = canvas.width = canvas.parentElement.clientWidth;
	const height = canvas.height = canvas.parentElement.clientHeight;
	const ctx = canvas.getContext('2d');
	const game = new Game(ctx, width, height);
	game.setRandomState();
	game.start();
</script>
```

If you don't want the game to be full-page, make sure to remove
`canvas.parentElement.clientWidth`/`Height` from the script above,
and set the width and height of your `canvas` element with CSS.
