import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-enquiry-detail',
  templateUrl: './enquiry-detail.page.html',
  styleUrls: ['./enquiry-detail.page.scss'],
})
export class EnquiryDetailPage implements OnInit {

  @Input() orderId:any;
  constructor(
    private modalController: ModalController,

  ) { }

  ngOnInit() {
    console.log(this.orderId);
    
  }

  close(){
    this.modalController.dismiss();
  }

}
