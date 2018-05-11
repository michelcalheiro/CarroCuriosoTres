import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

 public base64Image: string;
 
  constructor(private camera: Camera, public global: GlobalProvider, public navCtrl: NavController) {

  }

	cameras() {
		//this.consultaPlacaSinespHTTP(placa) ;
		//this.consultarPlacaCC(placa) ;
		this.global.saida = 'FOI';	
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
		 // Handle error
		});
	}


}
