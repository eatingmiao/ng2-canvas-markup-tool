import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Config, NavController } from 'ionic-angular';
import { MarkupToolComponent, MarkupToolOptions } from '../../markup-tool/markup-tool.module';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  encapsulation: ViewEncapsulation.None
})
export class HomePage {
  canvasOptions: MarkupToolOptions = {
    imageUrl: 'assets/imgs/timg.jpeg',
      drawButtonEnabled: true,
      drawButtonText: "Draw",
      textButtonText: "Text",
      patternButtonText: "Pattern",
      iconButtonText: "Icon",
      clearButtonEnabled: true,
      clearButtonText: "Clear",
      undoButtonText: "Undo",
      undoButtonEnabled: true,
      saveDataButtonEnabled: false,
      saveDataButtonText: "Save",
      iconList: [
        {id: 1, url:'assets/imgs/no.svg'},
        {id: 2, url:'assets/imgs/repair.svg'},
        {id: 3, url:'assets/imgs/yes.svg'}
      ]
  };
  
  @ViewChild('markupboard') markupTool: MarkupToolComponent;

  constructor(public navCtrl: NavController, private config: Config) {

  }

  ngOnInit() {
    this.config.set('ios', 'scrollAssist', 'false');
    this.config.set('ios', 'autoFocusAssist', 'false');
  }
}
