# Picture Markup Tool

- Angular2  
- HTML5 Canvas  

![example](http://p5mj4q6b8.bkt.clouddn.com/markup-tool.gif)


# Install

1. Install npm module:

    ```bash
    npm install https://github.com/eatingmiao/ng2-canvas-markup-tool.git
    ```
   
2. Add the module to your project:

	```typescript
	@NgModule({
	    imports: [
	        MarkupToolModule
	    ]
	    ...
	)}
	```
	
	In the html file, you can insert the markup-tool tag.

	Example:

	```html
	<markup-tool #markupboard
					[options]="canvasOptions" 
					(onClear)="onCanvasClear()" 
					(onSave)="onCanvasSave($event)" 
					(onText)="keyboardShow()">
	</markup-tool>
	```

	If there is too much overhead with inputs, you can just specify the [options] input, and specify the options from the typescript code.
		
	Code:
	
	```typescript
	canvasOptions: MarkupToolOptions = {
	     imageUrl: '',
	     undoButtonEnabled: true,
	     saveDataButtonEnabled: true,
	     drawButtonClass: "icon ion-ios-brush",
	     textButtonClass: "icon ion-ios-a",
	     textClearButton: "Cancel",
	     textSaveButton: "Save",
	     patternButtonClass: "icon ion-ios-shape",
	     iconButtonClass: "icon ion-ios-checkmark-circle",
	     clearButtonClass: "icon ion-ios-close",
	     undoButtonClass: "icon ion-ios-undo-2",
	     saveDataButtonClass: "icon ion-ios-save",
	     iconList: [
	    	  {id: 1, url:'assets/img/markup/yes.svg'},
	    	  {id: 2, url:'assets/img/markup/repair.svg'},
	    	  {id: 3, url:'assets/img/markup/no.svg'}
	     ],
	     shouldDownload: false
  	};
	```