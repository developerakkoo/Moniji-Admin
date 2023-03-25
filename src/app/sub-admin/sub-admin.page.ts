import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.page.html',
  styleUrls: ['./sub-admin.page.scss'],
})
export class SubAdminPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  registerSubAdmin(){
    this.router.navigate(['sub-admin','register'])
  }


  viewSubAdmin(){
    this.router.navigate(['sub-admin','view'])

  }
}
