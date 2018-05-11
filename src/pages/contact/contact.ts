import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { OpenALPR, OpenALPROptions, OpenALPRResult } from '@ionic-native/openalpr';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

 public base64Image: string;
 
  constructor(private camera: Camera, private openALPR: OpenALPR, public global: GlobalProvider, public navCtrl: NavController) {

  }

	cameras() {
		//this.consultaPlacaSinespHTTP(placa) ;
		//this.consultarPlacaCC(placa) ;
		//this.global.saida = 'FOI';
		this.base64Image = '../assets/imgs/onix.png';	
	}

	takePicture(){
		const options: CameraOptions = {
		  quality: 100,
		  destinationType: this.camera.DestinationType.DATA_URL,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
		 // imageData is either a base64 encoded string or a file URI
		 // If it's base64:
		 this.base64Image = 'data:image/jpeg;base64,' + imageData;
		}, (err) => {
		 this.base64Image = '../assets/imgs/onix.png';
		});
	}

	analisePicture(imageData){
		//debugger;
		const scanOptions: OpenALPROptions = {
		   country: this.openALPR.Country.EU,
		   amount: 3
		}

// To get imageData, you can use the @ionic-native/camera module for example. It works with DestinationType.FILE_URI and DATA_URL
		this.openALPR.scan(imageData, scanOptions)
		.then((res: [OpenALPRResult]) => {
			//console.log(res);
			this.global.saida = "OK" +  res.toString();
		})
		.catch((error: Error) => {
			//console.error(error);
			this.global.saida = "E" + error.toString();	
		});
	}

}
