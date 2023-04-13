import { EnquiryDetailPage } from './../enquiry-detail/enquiry-detail.page';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userId;

  isEnquiry:boolean = true;
  isPending:boolean = false;
  isPartial:boolean = false;
  isComplete:boolean = false;

  statusSelected: string = "completed";


  constructor(private router: Router,
              private route: ActivatedRoute,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private modalController: ModalController,
             ) 
              {
                this.userId = this.route.snapshot.paramMap.get('userId');
                console.log(`UserID in Home:- ${this.userId}`);
                this.getAllOrders(1);
              }

              async presentLoading(msg: string) {
                const loading = await this.loadingController.create({
                  message: msg,
                });
                await loading.present();
              }
            
            
              async presentAlert(msg: string, header: string) {
                const alert = await this.alertController.create({
                  header: header,
                  subHeader:'',
                  message:msg,
                  buttons: ['OK']
                });
              
                await alert.present();
              }

              openNotifications(){
                this.router.navigate(['notifications', this.userId])
              
              }

              openSettings(){
                this.router.navigate(['settings'])
              }

              dateChangedStart(date:any){
                console.log(date);
                
              }


              async getAllOrders(status: any){
              }


              
              segmentChanged(ev: any){
                console.log(ev.detail.value);
                if(ev.detail.value == 1){
                  this.isEnquiry = true;
                  this.isPending = false;
                  this.isComplete = false;
                  this.isPartial = false;
                }
                if(ev.detail.value == 2){
                  this.isPending = true;
                  this.isComplete = false;
                  this.isEnquiry = false;
                  this.isPartial = false;


                }
                if(ev.detail.value == 3){
                  this.isPartial = true;
                  this.isPending = false;
                  this.isComplete = false;
                  this.isEnquiry = false;


                }
                if(ev.detail.value == 4){
                  this.isComplete = true;
                  this.isEnquiry = false;
                  this.isPartial = false;
                  this.isPending = false;
                }
              }

         
              async openDetails(){
                console.log("Open Details");
                const modal = await this.modalController
                .create({
                  component: EnquiryDetailPage,
                  componentProps: { orderId: 1234 }
                  });
                
                  await modal.present();
              }


              statusSelectEvent(ev: any){
                console.log(ev.detail.value);
                this.statusSelected = ev.detail.value;

                
              }


}
