import { EnquiryDetailPage } from './../enquiry-detail/enquiry-detail.page';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userId;

  users:any[] = [];

  isEnquiry:boolean = true;
  isPending:boolean = false;
  isPartial:boolean = false;
  isComplete:boolean = false;

  statusSelected: string = "completed";

  getOrderSub!: Subscription;
  acceptOrderSub!: Subscription;
  rejectOrderSub!: Subscription;
  getUserSub!: Subscription;

  orders!:any[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private http: HttpClient,
              private io: Socket,
              private modalController: ModalController,
             ) 
              {
                this.userId = this.route.snapshot.paramMap.get('userId');
                console.log(`UserID in Home:- ${this.userId}`);
                // this.io.connect();
                // this.io.on('get:order', (order:any) =>{
                //   console.log(order);
                //   console.log("Socket Order ");
                //   this.orders = order;
                // })
                this.getAllOrders(1);
                  this.getUser();
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

              async presentAlertConfirm(order: any) {
                const alert = await this.alertController.create({
                  header: 'Confirm!',
                  message: 'Do you want to confirm order?',
                  buttons: [
                    {
                      text: 'No',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: () => {
                        console.log('Confirm Cancel: blah');
                      }
                    }, {
                      text: 'Yes',
                      handler: () => {
                        console.log('Confirm Okay');
                        this.presentLoading("Accepting the Order...")
                        this.acceptOrderSub = this.http.put(environment.API + `/updateOrder/${this.userId}`, {
                          id: order._id,
                          isAccepted: true
                        }).subscribe({
                          next: (value) =>{
                            console.log(value);
                            this.loadingController.dismiss();
                          },

                          error: (error) =>{
                            console.log(error);
                            this.loadingController.dismiss();
                          }
                        })
                      }
                    }
                  ]
                });
              
                await alert.present();
              }

              async presentAlertReject(order: any) {
                const alert = await this.alertController.create({
                  header: 'Reject!',
                  message: 'Do you want to reject order?',
                  buttons: [
                    {
                      text: 'No',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: () => {
                        console.log('Confirm Cancel: blah');
                      }
                    }, {
                      text: 'Yes',
                      handler: () => {
                        console.log('Confirm Okay');
                        this.presentAlertRejectInput(order);
                      }
                    }
                  ]
                });
              
                await alert.present();
              }

              async presentAlertRejectInput(order: any) {
                const alert = await this.alertController.create({
                  header: 'Confirm!',
                  message: 'Reason <strong>for rejection</strong>!!!',
                  inputs:[
                    {
                      placeholder: 'Reason here...',
                      type: 'text',
                      name:'msg'
                    }
                  ],
                  buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: () => {
                        console.log('Confirm Cancel: blah');
                      }
                    }, {
                      text: 'Okay',
                      handler: (value) => {
                        this.presentLoading("Rejecting the order...");

                        console.log(value.msg);
                        this.rejectOrderSub = this.http.put(environment.API +`/order/${order._id}`, {
                          isAlternate: true,
                          
                          status: 3,
                          message: value.msg
                        }).subscribe({
                          next:(value) =>{
                            this.loadingController.dismiss();
                            
                          },

                          error: (error) =>{
                            console.log(error);
                            this.loadingController.dismiss();
                            
                          }
                        })
                      }
                    }
                  ]
                });
              
                await alert.present();
              }
              openNotifications(){
                this.router.navigate(['notifications', this.userId])
              
              }

              openSettings(){
                this.router.navigate(['settings'])
              }


              openAnalytics(){
                this.router.navigate(['analytics']);
              }

              dateChangedStart(date:any){
                console.log(date);
                
              }


              async getAllOrders(status: any){
                this.getOrderSub = this.http.get(environment.API + `/order`)
                .subscribe({
                  next: (order:any) =>{
                    console.log(order);
                    this.orders = order['order'];
                    
                  },
                  error: (error) => {
                    console.log(error);
                    
                  }
                })
              }



              getUser(){
                this.getUserSub = this.http.get(environment.API +'/user')
                .subscribe({
                  next: (res:any)=>{
                    this.users = res['user'];
                    console.log(this.users);
                    console.log(res);
                  },
                  error:(error) =>{
                    console.log(error);
                    
                  },
                  complete:() =>{
                    console.log("get user complete");
                    
                  }
                })
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

         

              async acceptOrder(order:any){
                console.log(order);
                this.presentAlertConfirm(order);
              }

              async rejectOrder(order:any){
                console.log(order);
                this.presentAlertReject(order);
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
