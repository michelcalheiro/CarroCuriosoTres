import { Component } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { NavController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public global: GlobalProvider, public navCtrl: NavController, public http: Http) {

  }

    //dadoscarro = '';

  	items = [
    'Pokémon Yellow',
    'Super Metroid',
    'Halo'
  ];

	consultarPlaca(placa) {
		//this.consultaPlacaSinespHTTP(placa) ;
		//this.consultarPlacaCC(placa) ;
		this.global.myGlobalVar = placa;	
	}

	consultaPlacaSinespHTTP = function(placa)    {
	
    //$scope.retorno = "consultaPlacaSinespHTTP";
    
    const crypto = require('crypto')

    //$ionicLoading.show();

    const secret = '#8.1.0#Mw6HqdLgQsX41xAGZgsF';

    var lat = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    var lon = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    var latitude  = '-45.5' //. rand(100000, 999999);
    var longitude = '-15.7' //. rand(100000, 999999);

    latitude = latitude.concat(lat.toString());
    longitude = longitude.concat(lon.toString());

    //placa =  $scope.placa;

    const token = crypto.createHmac('sha1', placa+secret).update(placa).digest('hex');

    const data = new Date().toISOString().replace("T", " ").substr(0, 19);

    const xml = '<?xml version="1.0" encoding="utf-8" standalone="yes" ?>\
      <v:Envelope xmlns:v="http://schemas.xmlsoap.org/soap/envelope/">\
        <v:Header>\
          <b>samsung GT-I9192</b>\
          <c>ANDROID</c>\
          <d>8.1.0</d>\
          <i>'+latitude+'</i>\
          <e>4.1.5</e>\
          <f>10.0.0.1</f>\
          <g>'+token+'</g>\
          <k></k>\
          <h>'+longitude+'</h>\
          <l>'+data+'</l>\
          <m>8797e74f0d6eb7b1ff3dc114d4aa12d3</m>\
        </v:Header>\
        <v:Body>\
          <n0:getStatus xmlns:n0="http://soap.ws.placa.service.sinesp.serpro.gov.br/">\
            <a>'+placa+'</a>\
          </n0:getStatus>\
        </v:Body>\
      </v:Envelope>';

      const headers = {
        "Content-type": "text/xml",
        "Accept": "text/xml",
        "Content-length": xml.length
      }
    //$scope.retorno = "consultaPlacaSinespHTTPINICIO";

    this.http.post("https://cidadao.sinesp.gov.br/sinesp-cidadao/mobile/consultar-placa/v3", xml, headers)
      .subscribe(data => {
      	dadoscarro = JSON.stringify(data['_body']);
        console.log(dadoscarro);
       }, error => {
        console.log(error);// Error getting the data
      });

}

consultarPlacaCC(placa) {
    //var headers = new Headers();
    
    const headers = {
        "Content-type": "text/xml",
        "Accept": "text/xml"
      }
    //headers.append("Accept", 'text/xml');
    //headers.append('Content-Type', 'text/xml' );

    //let options = new RequestOptions({ headers: headers });
 
    this.http.post("http://casarochadois.servehttp.com/fipe/consultasinesp.php?placa="+placa, "E", headers)
      .subscribe(data => {
      	//dadoscarro = JSON.stringify(data['_body']);
        //console.log(dadoscarro);
       }, error => {
        console.log(error);// Error getting the data
      });
  }

	itemSelected(item: string) {
		console.log("Selected Item", item);
	}


}
