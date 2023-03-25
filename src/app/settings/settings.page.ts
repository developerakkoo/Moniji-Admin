import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  userId;

  homeRoute = "";
  constructor(private router: Router,
    private route: ActivatedRoute,
    private db: Database,
    private loadingController: LoadingController,
    private alertController: AlertController,
    ) { 
    this.userId = this.route.snapshot.paramMap.get("userId");
    this.homeRoute = `home/${this.userId}`;
    

  }

  ngOnInit() {
  }


  openSubAdmin(){
    this.router.navigate(['sub-admin'])
  }
}
