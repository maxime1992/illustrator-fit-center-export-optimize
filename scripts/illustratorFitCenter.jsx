(function () {
	'use strict';
	// configuration
	var conf = {
		// work only with visible layout
		visibleLayersOnly: false,
		// padding left/right in percent
		paddingLeftRight: 0,
		// padding top/bottom in percent
		paddingTopBottom: 0
	};

	// ----------------

	// current document
	var activeDoc      = app.activeDocument;
	// board containing all the layers
	var board          = activeDoc.artboards[activeDoc.artboards.getActiveArtboardIndex()];
	// board's measures and ratio
	var boardWidth     = board.artboardRect[2];
	var boardHeight    = -board.artboardRect[3];
	var boardRatio     = boardWidth / boardHeight;
	// alias for layers
	var layers         = activeDoc.layers;
	// alias for the current layer
	var layer          = null;
	// group to gather all the sublayers if needed
	var group          = null;
	// current element width, height and ratio
	var elemWidth      = null;
	var elemHeight     = null;
	var ratio          = null;
	// copy of the actual element,
	// just the time to move layers into a group
	var newElem        = null;
	// new position [x,y] for the group to center
	var newX           = null;
	var newY           = null;
	// percentage needed to fit perfectly the board
	var pourcentResize = null;
	// does current element already has a group ?
	var hasGroup       = null;
	// index to count
	var i              = null;
	var j              = null;

	// hide all the layers if configuration allows it
	if (!conf.visibleLayersOnly) {
		for (i = 0; i < layers.length; i++) {
			layers[i].visible = false;
		}
	}

	// start the job for all the layers
	for (i = 0; i < layers.length; i++) {
		// alias for the current layer
		layer = layers[i];

		// if configuration require to work only with visible layer
		// continue to next layer if current one is hidden
		if (conf.visibleLayersOnly && !layer.visible) {
			continue;
		}

		// show the current layer
		layer.visible = true;

		// unlock the layer
		layer.locked = false;

		// if more than one element : need to group
		if (layer.pageItems.length > 1) {
			hasGroup = false;

			for (j = 0; j < layer.pageItems.length; j++) {
				if (layer.pageItems[j].typename.toString() === 'GroupItem') {
					hasGroup = true;
				}
			}

			// if current element already contains a group
			if (hasGroup) {
				continue;
			}

			// many layers so we need to create a group ...
			group = layer.groupItems.add();

			// ... and copy all the layers into this group
			for (j = 0; j < layer.pageItems.length; j++) {
				// unlock and set visible all sublayers
				layer.pageItems[j].locked = false;
				layer.pageItems[j].visible = true;

				// copy everything to the group EXCEPT the group itself
				if (layer.pageItems[j].typename.toString() !== 'GroupItem') {
					newElem = layer.pageItems[j].duplicate();
					newElem.moveToBeginning(group);
				}
			}

			// then, remove the originals
			while (layer.pageItems.length > 1) {
				layer.pageItems[1].remove();
			}
		}

		// select the layer or the group to resize and center.
		layer.pageItems[0].selected = true;

		// get width and height of the current element
		elemWidth  = layer.pageItems[0].width;
		elemHeight = layer.pageItems[0].height;
		ratio      = elemWidth / elemHeight;

		switch (boardRatio >= ratio) {
			// top and bottom have to touch before sides
			case true:
				pourcentResize = boardHeight / elemHeight * 100 - conf.paddingTopBottom;

				layer.pageItems[0].resize(
					// x
					pourcentResize,
					// y
					pourcentResize,
					// changePositions
					true,
					// changeFillPatterns
					true,
					// changeFillGradients
					true,
					// changeStrokePattern
					true
				);

				// get current width and height
				elemWidth  = layer.pageItems[0].width;
				elemHeight = layer.pageItems[0].height;

				// compute new position
				newX = boardWidth / 2 - elemWidth / 2;
				newY = -boardHeight / 2 + elemHeight / 2;

				// set new position
				layer.pageItems[0].position = [newX, newY];
				break;

			// sides have to touch before top and bottom
			default:
				pourcentResize = boardWidth / elemWidth * 100 - conf.paddingLeftRight;

				layer.pageItems[0].resize(
					// x
					pourcentResize,
					// y
					pourcentResize,
					// changePositions
					true,
					// changeFillPatterns
					true,
					// changeFillGradients
					true,
					// changeStrokePattern
					true
					);

				// get current width and height
				elemWidth  = layer.pageItems[0].width;
				elemHeight = layer.pageItems[0].height;

				// compute new position
				newX = boardWidth / 2 - elemWidth / 2;
				newY = -boardHeight / 2 + elemHeight / 2;

				// set new position
				layer.pageItems[0].position = [newX, newY];
				break;
		}

		// unselect current selection
		activeDoc.selection = null;

		// hide current layer only if configuration is set
		// to work on all layers (visible or not)
		if (!conf.visibleLayersOnly) {
			layers[i].visible = false;
		}
	}
})();
