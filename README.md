Illustrator : Fit, center, export and optimize output
===========================================================

Homemade illustrator script to fit all layers into the current board and center them.  
You can also export all the layers as SVG and optimize each of them with Grunt.

# Credit
The amazing script "*MultiExporter.jsx*" has been made by "*Tom Byrne*" and is available [here](https://gist.github.com/TomByrne/7816376).  
If you want to support his work, please consider buying his version of the plugin in Adobe store [here](https://creative.adobe.com/addons/products/2955).

# Why ?
I needed a script to fit and center all my layers inside the artboard.  
I found out some good scripts to resize the artboard but most of them couldn't handle sublayers.  
Plus, i don't wan't to crop/extend the artboard but to resize the element to fit the artboard.

# Show me the awesome !
A picture says more than a thousand words, doesn't it ?  

![Image](./demo/demo.gif?raw=true)

As you may have noticed, i did custom "*Tom Byrne*"" script in order to crop sides if needed, but never crop the top and bottom.  
This way, you'll be able to export all the SVG centered and with the same height (which is cool for a webfont by the way :ok_hand:).

# How to use it well ?
I love to have a nice workflow, to keep my files organized and to have a clean code.  
That's why you'll be able to :  
- Find the 2 scripts inside "*scripts*" folder.  
- Try the demo on your own. Check the demo folder.  
- Check if "*illustratorFitCenter.jsx*" code stays clean. Just run "**npm test**" (at the root of the repo).  
- In order to optimize your SVGs, generate them into "*./dist/svg*".
- Optimize the SVGs with only one command : "**grunt**" (at the root of the repo). Get them after in "*./dist/svg_min*" folder.  

# Quick custom
Few options are available to custom the "*illustratorFitCenter.jsx*" script.  
They are available at the beginning of the script and they speak for themselves :  
```
	// configuration  
	var conf = {  
		// work only with visible layout  
		visibleLayersOnly: false,  
		// padding left/right in percent  
		paddingLeftRight: 0,  
		// padding top/bottom in percent  
		paddingTopBottom: 0  
	};
```

# About "*Script Bay*"
If you use a lot of Illustrator scripts, you should have a look to "*[Script Bay](http://in-tools.com/article/script-bay/script-panel-replacement-for-the-entire-creative-suite/)*" ([download link](http://in-tools.com/downloads/lab/ScriptBay.zxp)).  
It's a nice plugin, especially if like me you have troubles with Illustrator and need to search your script every time you want to launch it.

# Contribution
I do not guarantee the effectiveness of any script and i highly recommand you to have a backup somewhere.  
If you have any idea to improve "*illustratorFitCenter.jsx*" or this repo, a pull-request is welcome :smile: !  

In order to contribute, please run "**npm test**" and check you don't have any JSHint error :tada:.  

Cheers !