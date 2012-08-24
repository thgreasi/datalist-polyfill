#Create a Datalist Polyfill in Minutes

![logo image](http://ubuntuone.com/5uMFsYL236WQJxBlhQIeAm)

In this tutorial you will learn how to use HTML5 Datalists and also provide a fallback for older browsers. By the end of this article, you will create a highly customizable polyfill library to use for your projects.

---
##Step 1: *Developing with Native Support*

Datalists introduced in HTML5, enhance your input tags, by providing suggestions for the most common/expected values. This makes your forms, faster to fill and with less errors (especially typos).

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Color Datalist</title>
</head>
<body>
	<input type="text" name="color" id="color" value="" list="colorlist" />
	<datalist id="colorlist">
		<option value="Black" />
		<option value="Blue" />
		<option value="Dark Green" />
		<option value="Grey" />
		<option value="Green" />
		<option value="Red" />
		<option value="White" />
		<option value="Yellow" />
	</datalist>
</body>
</html>
```

In an ideal world, where all your site visitors prefer modern browsers, some lines of HTML code are enough to produce a nice autocomplete feature. Current versions of Firefox, Chrome and Opera, support Datalists but their Implementations differs. Firefox shows suggestions that contain the input text, in contrast with Chrome and Opera showing only those that begin with it.

![native support image](http://ubuntuone.com/5KtxS4f4Iv3zun8XbmL7Fa)

---
##Step 2: *Supporting older browsers*

It's obvius that older browsers, without HTML5 support, will not give us the above result. You can easily check which browsers support Datalists at [caniuse.com](http://caniuse.com/datalist). To provide support for them, we will make a JavaScript pollyfill library.

Some of them, including [IE 9](http://en.wikipedia.org/wiki/Internet_Explorer_9), will **remove** the option elements that we placed inside the datalist. So our first step is to preserve the option elements. This can easily be accomblished by surrounding them with a select element, as shown below.

```html
...
<input type="text" name="color" id="color" value="" list="colorlist" />
<datalist id="colorlist">
	<select style="display: none;">
		<option value="Black" />
		<option value="Blue" />
		<option value="Dark Green" />
		<option value="Grey" />
		<option value="Green" />
		<option value="Red" />
		<option value="White" />
		<option value="Yellow" />
	</select>
</datalist>
...
```

![IE9 before and after image](http://ubuntuone.com/4I1Lxoo7PgPkiTkoV35Rz0)

As you can see, we give the select element a "display: none;" style, so that the select input is not displayed. Note that, browsers supporting HTML5 datalist, will just skip the select element and continue to function as supposed.

---
##Step 3: *Include jQuery & jQuery UI*

I'm going to use the [jQuery UI autocomplete](http://jqueryui.com/demos/autocomplete/) widget, which gives us an analogus behavior, is easy to use and yet very customizable. First of all we need to inlcude jQuery and jQuery UI javascript libraries in our page. You can download local copies of the libraries from [jquery.com](http://jquery.com) and [jqueryui.com](http://jqueryui.com/) or reference them directly from [Google's CDN](https://developers.google.com/speed/libraries/devguide) as I will demonstrate in my example code.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Color Datalist</title>
	<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" type="text/css" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
</head>
<body>
	<input type="text" name="color" id="color" value="" list="colorlist" />
	<datalist id="colorlist">
		<select style="display: none;">
			<option value="Black" />
			<option value="Blue" />
			<option value="Dark Green" />
			<option value="Grey" />
			<option value="Green" />
			<option value="Red" />
			<option value="White" />
			<option value="Yellow" />
		</select>
	</datalist>
	<script>
	$(document).ready(function () {
		var availableTags = $('#colorlist').find('option').map(function () {
			return this.value;
		}).get();
		$('#color').autocomplete({ source: availableTags });
	});
	</script>
</body>
</html>
```

As you can see, the code needed to initialize the autocomple widget is quite compact. We first create the list of suggestions by reading the datalist's options elements, and then call the autocomplete function on the desired input element inlcuding a the list as a parameter.

---
##Step 4: *Turning it into a polyfill*

The main idea of a polyfill is that it runs only when a feature is missing from a browser, letting modern browsers use their (faster) native implementation. The first line of the code below determines if there is support for HTML5 datalist. After that and only if support is absent, we initialize the autocomplete widget, for each input element of the page with the appropriate datelist.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Color Datalist</title>
	<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" type="text/css" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
</head>
<body>
	<input type="text" name="color" id="color" value="" list="colorlist" />
	<datalist id="colorlist">
		<select style="display: none;">
			<option value="Black" />
			<option value="Blue" />
			<option value="Dark Green" />
			<option value="Grey" />
			<option value="Green" />
			<option value="Red" />
			<option value="White" />
			<option value="Yellow" />
		</select>
	</datalist>
	<script>
	$(document).ready(function () {
		var nativedatalist = !!('list' in document.createElement('input')) && 
			!!(document.createElement('datalist') && window.HTMLDataListElement);
	
		if (!nativedatalist) {
			$('input[list]').each(function () {
				var availableTags = $('#' + $(this).attr("list")).find('option').map(function () {
					return this.value;
				}).get();
				$(this).autocomplete({ source: availableTags });
			});
		}
	});
	</script>
</body>
</html>
```

The result, as you can see, is quite close to browsers with native support. Moreover you are free to style the appearence of the list with css or [jQuery ThemeRoller](http://jqueryui.com/themeroller/). Also note that depending on the size of your project, you might better be using libraries like [Modernizr](http://modernizr.com/) to detect the supporting features of a browser.

![IE and safari](http://ubuntuone.com/0fypjvERWuHohD68CEYRUU)

The above javascript code could also (or better should) be placed in a seperate .js file. That way, just by including that file in any page (below its dependencies), you provide support to all datalists used in the page, no matter what browser the user is using.

---
##Step 5: *Conditional async loading with Modernizr (optional)*

In this step I'm going to use [Modernizr](http://modernizr.com/) for feature detection and conditional async loading of the polyfill. So first of all download a [custom build of Modernizr](http://modernizr.com/download/#-input-inputtypes-load) with (at least) "Input Attributes", "Input Types" and "Modernizr.load" checked, as shown below. I also like to include html5shiv so that html5 elements (like section, nav, header, footer and article) work on old browsers. Click Generate and Download the custom build, which will get a name like modernizr.custom.xxxxx.js (where xxxxx will be five random numbers).

![Modernizr build](http://ubuntuone.com/0PyxDAMz4QM0MgjkUEmnNF)

Using Modernizr makes feature detection much simpler and accurate. It also has built in [yepnope.js](http://yepnopejs.com/), to provide an easy conditional asyncronus loading of resources. To take advantage of the conditional loading, we first seperate the polyfill's logic from our html code, in a seperate DatalistPolyfill.js file. Your DatalistPolyfill.js file should look like this.

```js
$(document).ready(function () {
	$('input[list]').each(function () {
		var availableTags = $('#' + $(this).attr("list")).find('option').map(function () {
			return this.value;
		}).get();
		$(this).autocomplete({ source: availableTags });
	});
});
```

Next, place DatalistPolyfill.js and modernizr.custom.xxxxx.js in a folder named 'js', next to your html file. Remove all the resource references (js & css) from your html and add just a script tag for modernizer and one more to initialize it.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Color Datalist</title>
	<script src="js/modernizr.custom.95515.js"></script>
	<script>
		Modernizr.load([
			'https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js',
			{
				test : Modernizr.input.list,
				nope : ['https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css',
						'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js',
						'js/DatalistPolyfill.js']
			}
		]);
	</script>
</head>
<body>
	<input type="text" name="color" id="color" value="" list="colorlist" />
	<datalist id="colorlist">
		<select style="display: none;">
			<option value="Black" />
			<option value="Blue" />
			<option value="Dark Green" />
			<option value="Grey" />
			<option value="Green" />
			<option value="Red" />
			<option value="White" />
			<option value="Yellow" />
		</select>
	</datalist>
</body>
</html>
```

###Finally note that:
*   The above code will allways load jQuery.
*   Only when we need to polyfill datalist, it will also load jquery-ui.css, jquery-ui.min.js, and the polyfill's initialization script.
*   Placing those scripts in the head element will benefit your performance, since the async loading will start as soon as possible.
*   Since all the yepnope functionality can be accessed through Modernizr.load function, you might be interested reading this [tutorial of yepnope](http://net.tutsplus.com/tutorials/javascript-ajax/easy-script-loading-with-yepnope-js/).
