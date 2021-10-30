import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  public showCamera = false;
  public textScanned: any;

  constructor(private barcodeScanner:BarcodeScanner) {}
  
  Barscan(){
    const options: BarcodeScannerOptions = {
      showTorchButton: false,
      prompt: 'Placez le barcode dans la zone de scan',
      resultDisplayDuration: 500,
      formats: 'QR_CODE,CODE_128,CODABAR,CODE_39,CODE_93,UPC_A,UPC_E,DATA_MATRIX,EAN_8,EAN_13,PDF_417,RSS_EXPANDED',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then((barcodeData:any) => {
      console.log('Barcode data', barcodeData);
      this.textScanned= barcodeData;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  ngOnInit() {
    this.Barscan();
  }
  

}
