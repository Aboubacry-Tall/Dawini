import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  public showCamera = false;
  public textScanned: string='';

  constructor(private barcodeScanner:BarcodeScanner) {}
  
  Barscan(){
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 10000,
      formats: 'QR_CODE,CODE_128,MSI,CODABAR,CODE_39,CODE_93,UPC_A,UPC_A,DATA_MATRIX,RSS_EXPANDED ',
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
  }
  

}
