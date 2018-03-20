import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Config, NavController } from 'ionic-angular';
import { MarkupToolComponent, MarkupToolOptions } from '../../../../index';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  encapsulation: ViewEncapsulation.None
})
export class HomePage {
  canvasOptions: MarkupToolOptions = {
    imageUrl: 'assets/imgs/timg.jpeg',
      drawButtonText: "Draw",
      drawButtonEnabled: true,
      textButtonText: "Text",
      textButtonEnabled: true,
      patternButtonEnabled: true,
      patternButtonText: "Pattern",
      iconButtonEnabled: true,
      iconButtonText: "Icon",
      clearButtonEnabled: true,
      clearButtonText: "Clear",
      undoButtonText: "Undo",
      undoButtonEnabled: true,
      saveDataButtonEnabled: true,
      saveDataButtonText: "Save",
      iconList: [
        {id: 1, url:'assets/imgs/no.svg'},
        {id: 2, url:'assets/imgs/repair.svg'},
        {id: 3, url:'assets/imgs/yes.svg'}
      ],
      shouldDownload: true
  };
  
  @ViewChild('markupboard') markupTool: MarkupToolComponent;

  constructor(public navCtrl: NavController, private config: Config) {

  }

  onCanvasSave(updateUUID: string) {
    console.log(`UNDO with uuid: ${updateUUID}`);
    
    //Returns base64 string representation of the canvas
    let generatedString = this.markupTool.generateCanvasDataUrl("image/jpeg", 0.3);
     
    //Generates a IE canvas blob using a callbak method
    this.markupTool.generateCanvasBlob((blob: any) => {
       
    }, "image/png");
    
    //This method uses both of the above method and returns either string or blob
    //using a callback method
    this.markupTool.generateCanvasData((generatedData: string | Blob) => {
      
    }, "image/png", 1);
  }

  ngOnInit() {
    this.config.set('ios', 'scrollAssist', 'false');
    this.config.set('ios', 'autoFocusAssist', 'false');
  }
}
